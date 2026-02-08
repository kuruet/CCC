/**
 * Payment Service
 * ----------------
 * Centralized backend logic for creating and updating payments.
 *
 * PRODUCTION GUARANTEES:
 * - Backend-authoritative (no frontend trust)
 * - Idempotent-safe
 * - No registration confirmation here
 * - No emails
 * - No seat locking
 *
 * This service ONLY manages payment records.
 */

import Payment from "../models/Payment.js";
import { PAYMENT_STATES } from "../utils/paymentStates.js";

/**
 * Create a payment record safely.
 * This should be called when a Razorpay order is created.
 *
 * @param {Object} payload
 * @returns {Promise<Payment>}
 */
export async function createPayment(payload) {
  /**
   * Expected payload:
   * - razorpay_order_id
   * - amount
   * - currency
   * - slot
   * - email
   * - phone
   * - userId
   * - workshopId
   */

  // Idempotency: one payment per Razorpay order
 const existing = await Payment.findOne({
  razorpay_order_id: payload.razorpay_order_id,
  status: { $ne: PAYMENT_STATES.FAILED },
});

if (existing) {
  return existing;
}


  const payment = await Payment.create({
    ...payload,
    status: PAYMENT_STATES.CREATED,
    lastStatusUpdatedAt: new Date(),
  });

  return payment;
}

/**
 * Mark payment as initiated (frontend opened Razorpay)
 * Safe optional step.
 *
 * @param {ObjectId} paymentId
 * @returns {Promise<Payment>}
 */
export async function markPaymentInitiated(paymentId) {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status !== PAYMENT_STATES.CREATED) {
    return payment;
  }

  payment.status = PAYMENT_STATES.INITIATED;
  payment.lastStatusUpdatedAt = new Date();

  await payment.save();
  return payment;
}

/**
 * Mark payment as paid.
 * This MUST be called ONLY from Razorpay webhook or
 * verified backend source.
 *
 * @param {Object} params
 * @returns {Promise<Payment>}
 */
export async function markPaymentPaid({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  method,
}) {
  const payment = await Payment.findOne({ razorpay_order_id });

  if (!payment) {
    throw new Error("Payment not found for order");
  }

  // Idempotent: already paid
  if (
    payment.status === PAYMENT_STATES.PAID ||
    payment.status === "SUCCESS"
  ) {
    return payment;
  }

  payment.razorpay_payment_id = razorpay_payment_id;
  payment.razorpay_signature = razorpay_signature;
  payment.method = method;
  payment.status = PAYMENT_STATES.PAID;
  payment.lastStatusUpdatedAt = new Date();

  await payment.save();
  return payment;
}

/**
 * Mark payment as failed.
 * Used for webhook failure / expiry cases.
 *
 * @param {string} razorpay_order_id
 * @returns {Promise<Payment>}
 */
export async function markPaymentFailed(razorpay_order_id) {
  const payment = await Payment.findOne({ razorpay_order_id });

  if (!payment) {
    throw new Error("Payment not found for order");
  }

  // Terminal safety
  if (
    payment.status === PAYMENT_STATES.PAID ||
    payment.status === "SUCCESS"
  ) {
    return payment;
  }

if (payment.status === PAYMENT_STATES.FAILED) {
  return payment;
}

payment.status = PAYMENT_STATES.FAILED;
payment.lastStatusUpdatedAt = new Date();

await payment.save();
return payment;

}
