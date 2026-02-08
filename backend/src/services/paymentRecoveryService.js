/**
 * Payment Recovery Service
 * ------------------------
 * Manual + automated recovery utilities for payment / registration mismatches.
 *
 * PURPOSE:
 * - Heal edge cases where payment is successful but registration is not confirmed
 * - Support admin-triggered recovery
 * - Used by reconciliation jobs or admin tools
 *
 * HARD GUARANTEES:
 * - Idempotent (safe to run multiple times)
 * - Never downgrades CONFIRMED registrations
 * - Never double-confirms
 * - No frontend dependency
 */

import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";

import {
  transitionRegistrationState,
} from "./registrationService.js";

import { REGISTRATION_STATES } from "../utils/registrationStateMachine.js";

/**
 * Recover a single payment → registration pair
 *
 * @param {ObjectId|string} paymentId
 * @returns {Promise<{success: boolean, reason?: string}>}
 */
export async function recoverPaymentById(paymentId) {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    return { success: false, reason: "payment_not_found" };
  }

  // Only recover successful payments
  if (
    payment.status !== "SUCCESS" &&
    payment.status !== "PAID"
  ) {
    return {
      success: false,
      reason: "payment_not_successful",
    };
  }

  const registration = await Registration.findOne({
    paymentId: payment._id,
  });

  if (!registration) {
    return {
      success: false,
      reason: "registration_not_found",
    };
  }

  // Already confirmed → no-op
  if (registration.status === REGISTRATION_STATES.CONFIRMED) {
    return { success: true };
  }

  // Never override terminal failure
  if (registration.status === REGISTRATION_STATES.FAILED) {
    return {
      success: false,
      reason: "registration_failed_state",
    };
  }

  await transitionRegistrationState(
    registration._id,
    REGISTRATION_STATES.CONFIRMED
  );

  return { success: true };
}

/**
 * Bulk recovery helper
 * Used by cron jobs or admin-triggered actions
 *
 * @param {Array<ObjectId|string>} paymentIds
 * @returns {Promise<{recovered: number, failed: number}>}
 */
export async function recoverPaymentsBulk(paymentIds = []) {
  let recovered = 0;
  let failed = 0;

  for (const id of paymentIds) {
    try {
      const result = await recoverPaymentById(id);
      if (result.success) {
        recovered++;
      } else {
        failed++;
      }
    } catch (err) {
      failed++;
      console.error(
        "❌ Bulk payment recovery error:",
        id,
        err.message
      );
    }
  }

  return { recovered, failed };
}
