/**
 * Webhook Payment Service
 * ----------------------
 * Backend-authoritative finalization logic driven ONLY by Razorpay webhooks.
 *
 * HARD GUARANTEES:
 * - Idempotent (safe on duplicate webhooks)
 * - Backend is the source of truth
 * - No frontend dependency
 * - Seat locking + email triggering happens ONLY here (via services)
 *
 * This service is called by webhookController.js
 */

import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";

import {
  markPaymentPaid,
  markPaymentFailed,
} from "./paymentService.js";

import {
  transitionRegistrationState,
} from "./registrationService.js";

import { REGISTRATION_STATES } from "../utils/registrationStateMachine.js";
import { sendRegistrationConfirmation } from "./emailService.js";

/**
 * Handle successful Razorpay payment webhook
 *
 * @param {Object} payload - Razorpay webhook payload
 */
export async function handlePaymentCaptured(payload) {
  const razorpayOrderId = payload?.payload?.payment?.entity?.order_id;
  const razorpayPaymentId = payload?.payload?.payment?.entity?.id;
  const method = payload?.payload?.payment?.entity?.method;

  if (!razorpayOrderId || !razorpayPaymentId) {
    throw new Error("Invalid Razorpay webhook payload");
  }

  /**
   * 1️⃣ Mark payment as PAID (idempotent)
   * - Safe if webhook is delivered multiple times
   */
  const payment = await markPaymentPaid({
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    method,
  });

  /**
   * 2️⃣ Fetch linked registration
   */
  const registration = await Registration.findOne({
    paymentId: payment._id,
  });

  if (!registration) {
    // Valid payment but missing registration is a serious data issue
    throw new Error(
      `Registration not found for payment ${payment._id}`
    );
  }

  /**
   * 3️⃣ Idempotency guard — already fully confirmed
   */
  if (registration.status === REGISTRATION_STATES.CONFIRMED) {
    return {
      success: true,
      message: "Registration already confirmed",
    };
  }

  /**
   * 4️⃣ Transition PAYMENT_INIT → PAID
   * (only if not already done)
   */
  if (registration.status === REGISTRATION_STATES.PAYMENT_INIT) {
    await transitionRegistrationState(
      registration._id,
      REGISTRATION_STATES.PAID
    );
  }

  /**
   * 5️⃣ Transition PAID → CONFIRMED
   */
  if (registration.status !== REGISTRATION_STATES.CONFIRMED) {
    await transitionRegistrationState(
      registration._id,
      REGISTRATION_STATES.CONFIRMED
    );
  }

  /**
   * 6️⃣ Send confirmation email (idempotent)
   */
  if (!registration.confirmationSent) {
    Promise.resolve()
      .then(() => sendRegistrationConfirmation(registration._id))
      .catch((err) =>
        console.error(
          "❌ Webhook email dispatch failed:",
          err.message
        )
      );
  }

  return {
    success: true,
    registrationId: registration._id,
  };
}

/**
 * Handle failed / cancelled Razorpay payment webhook
 *
 * @param {Object} payload - Razorpay webhook payload
 */
export async function handlePaymentFailed(payload) {
  const razorpayOrderId =
    payload?.payload?.payment?.entity?.order_id;

  if (!razorpayOrderId) {
    throw new Error("Invalid Razorpay webhook payload");
  }

  /**
   * 1️⃣ Mark payment as FAILED (idempotent)
   */
  const payment = await markPaymentFailed(razorpayOrderId);

  /**
   * 2️⃣ Fetch linked registration
   */
  const registration = await Registration.findOne({
    paymentId: payment._id,
  });

  if (!registration) {
    return { success: true };
  }

  /**
   * 3️⃣ Transition to FAILED only if not terminal
   */
  if (
    registration.status !== REGISTRATION_STATES.CONFIRMED &&
    registration.status !== REGISTRATION_STATES.FAILED
  ) {
    await transitionRegistrationState(
      registration._id,
      REGISTRATION_STATES.FAILED
    );
  }

  return {
    success: true,
    registrationId: registration._id,
  };
}
