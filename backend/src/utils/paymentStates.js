/**
 * Payment States
 * ---------------------------------------
 * Canonical payment status values used across
 * the backend.
 *
 * IMPORTANT:
 * - This file contains constants ONLY.
 * - No logic, no DB access, no side effects.
 * - Safe to import anywhere.
 *
 * Razorpay is the source of truth for PAID.
 */

/**
 * All possible payment states
 */
export const PAYMENT_STATES = Object.freeze({
  CREATED: "CREATED",      // Payment record created (order created)
  INITIATED: "INITIATED",  // Payment flow started on frontend
  PAID: "PAID",            // Confirmed via Razorpay (webhook / verification)
  FAILED: "FAILED",        // Payment failed / cancelled / expired
});

/**
 * Terminal payment states
 * Once reached, payment should never change.
 */
export const TERMINAL_PAYMENT_STATES = Object.freeze([
  PAYMENT_STATES.PAID,
  PAYMENT_STATES.FAILED,
]);
