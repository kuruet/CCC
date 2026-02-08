/**
 * Payment Reconciliation Job
 * --------------------------
 * Periodic safety net to recover from:
 * - missed webhooks
 * - transient network failures
 * - Razorpay delivery issues
 *
 * HARD GUARANTEES:
 * - Never double-confirm a registration
 * - Never downgrade CONFIRMED state
 * - Safe to run multiple times
 * - Safe to run concurrently
 *
 * This job is OPTIONAL but CRITICAL for production trust.
 */

import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";

import {
  markPaymentPaid,
} from "../services/paymentService.js";

import {
  transitionRegistrationState,
} from "../services/registrationService.js";

import { REGISTRATION_STATES } from "../utils/registrationStateMachine.js";

/**
 * Reconcile payments that are PAID/SUCCESS
 * but registrations are not CONFIRMED.
 *
 * This assumes Razorpay is the source of truth
 * and payment status is already correct.
 */
export async function reconcilePayments() {
  console.log("🔁 Starting payment reconciliation job");

  /**
   * Find payments that indicate success
   * but whose registrations are not finalized
   */
  const paymentsToReconcile = await Payment.find({
    status: { $in: ["SUCCESS", "PAID"] },
  }).lean();

  for (const payment of paymentsToReconcile) {
    try {
      const registration = await Registration.findOne({
        paymentId: payment._id,
      });

      if (!registration) {
        console.warn(
          "⚠️ Reconciliation: registration missing for payment",
          payment._id
        );
        continue;
      }

      // Already confirmed → nothing to do
      if (registration.status === REGISTRATION_STATES.CONFIRMED) {
        continue;
      }

      // Never downgrade terminal states
      if (registration.status === REGISTRATION_STATES.FAILED) {
        continue;
      }

      // Transition safely to CONFIRMED
      await transitionRegistrationState(
        registration._id,
        REGISTRATION_STATES.CONFIRMED
      );

      console.log(
        "✅ Reconciled registration",
        registration._id
      );
    } catch (err) {
      console.error(
        "❌ Reconciliation error for payment",
        payment._id,
        err.message
      );
    }
  }

  console.log("✅ Payment reconciliation job completed");
}

/**
 * Optional helper to run immediately
 * (useful for manual admin trigger or startup check)
 */
export async function runPaymentReconciliationJob() {
  try {
    await reconcilePayments();
  } catch (error) {
    console.error(
      "🔥 Payment reconciliation job failed:",
      error
    );
  }
}
