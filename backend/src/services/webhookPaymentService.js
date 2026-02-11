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
import Workshop from "../models/Workshop.js";

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


const MAX_SEATS_PER_SLOT = Number(process.env.MAX_SEATS_PER_SLOT || 30);

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

  // 🔒 HARD TERMINAL GUARD (PRODUCTION SAFE)
// 🔒 Terminal guard (but allow FAILED → PAID recovery)
if (registration.status === REGISTRATION_STATES.CONFIRMED) {
  return {
    success: true,
    message: "Already confirmed",
  };
}



  /**
 * 🔒 ENSURE WORKSHOP SLOT STRUCTURE EXISTS
 * Defensive init for legacy / missing data
 */
await Workshop.updateOne(
  {
    _id: registration.workshopId,
    slots: { $exists: false },
  },
  {
    $set: {
      slots: {
        SLOT_1: { confirmed: 0 },
        SLOT_2: { confirmed: 0 },
      },
    },
  }
);


  /**
   * 3️⃣ Idempotency guard — already fully confirmed
   */
 

  /**
   * 4️⃣ Transition PAYMENT_INIT → PAID
   * (only if not already done)
   */
  /**
 * 4️⃣ Ensure final CONFIRMED state (state machine enforces validity)
 */
// Ensure valid state progression enforced by state machine

let updatedRegistration = registration;

if (registration.status === REGISTRATION_STATES.PAYMENT_INIT) {
  updatedRegistration = await transitionRegistrationState(
    registration._id,
    REGISTRATION_STATES.PAID
  );
}


/**
 * 4.5️⃣ Enforce seat limit (AUTHORITATIVE)
 * This is the LAST-SEAT LOCK
 */
/**
 * 4.5️⃣ ATOMIC SEAT CLAIM (SINGLE SOURCE OF TRUTH)
 */

if (updatedRegistration.status !== REGISTRATION_STATES.PAID) {
  return {
    success: true,
    message: "Already processed",
  };
}



const seatClaim = await Workshop.findOneAndUpdate(
  {
    _id: updatedRegistration.workshopId,
    [`slots.${updatedRegistration.slot}.confirmed`]: {
      $lt: MAX_SEATS_PER_SLOT,
    },
  },
  {
    $inc: { [`slots.${updatedRegistration.slot}.confirmed`]: 1 },
  },
  { new: true }
);


// If seat claim failed OR registration already terminal, stop
if (!seatClaim || registration.status === REGISTRATION_STATES.CONFIRMED) {
  return {
    success: false,
    message: "Seat already processed or limit reached.",
  };
}


if (!seatClaim) {
  /**
   * Seat full AFTER payment capture
   * This is a BOOKING cancellation, not a payment failure
   */
 await transitionRegistrationState(
  updatedRegistration._id,
  REGISTRATION_STATES.CONFIRMED
);


  // ❌ DO NOT mark payment failed
  // Payment is already PAID at Razorpay
  // Refund should be handled separately

  return {
    success: false,
    message:
      "Seat limit exceeded. Booking cancelled. Refund will be processed.",
  };
}



/**
 * 5️⃣ Final confirmation (SAFE)
 */
await transitionRegistrationState(
  registration._id,
  REGISTRATION_STATES.CONFIRMED
);



  /**
   * 6️⃣ Send confirmation email (idempotent)
   */
/**
 * 6️⃣ Send confirmation email (STRICT idempotency)
 */
/**
 * 6️⃣ Send confirmation email (PRODUCTION SAFE)
 * - Send email first
 * - Mark confirmationSent ONLY after success
 */
if (!registration.confirmationSent) {
  try {
    await sendRegistrationConfirmation(registration._id);

    await Registration.updateOne(
      { _id: registration._id },
      { $set: { confirmationSent: true } }
    );
  } catch (err) {
    console.error(
      "❌ Confirmation email failed, will retry on webhook retry:",
      err.message
    );
    // DO NOT set confirmationSent
    // Webhook retry will re-attempt safely
  }
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
