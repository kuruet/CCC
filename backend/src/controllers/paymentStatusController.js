/**
 * Payment Status Controller
 * -------------------------
 * Read-only endpoint for frontend to check
 * payment + booking status.
 *
 * SOURCE OF TRUTH:
 * - Payment: Razorpay / webhook
 * - Registration: backend lifecycle
 *
 * NO side effects:
 * - No writes
 * - No emails
 * - No seat locking
 */

import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";

/**
 * GET /api/payment/status/:orderId
 *
 * Used by:
 * - PaymentStatus.jsx
 * - PaymentPending.jsx (optional polling)
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment order ID",
      });
    }

    const payment = await Payment.findOne({
      razorpay_order_id: orderId,
    }).lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        status: "NOT_FOUND",
        message: "Payment not found",
      });
    }

    const registration = await Registration.findOne({
      paymentId: payment._id,
    }).lean();

    /**
     * Payment failed / cancelled
     */
    if (
      payment.status === "FAILED" ||
      payment.status === "REFUNDED"
    ) {
      return res.json({
        success: false,
        status: "PAYMENT_FAILED",
        paymentStatus: payment.status,
        message:
          "Payment was not successful. If money was deducted, it will be refunded automatically.",
      });
    }

    /**
     * Payment done but booking not yet confirmed
     * (webhook pending / reconciliation running)
     */
    if (
      payment.status === "PAID" ||
      payment.status === "SUCCESS"
    ) {
      if (
        !registration ||
        registration.status !== "CONFIRMED"
      ) {
        return res.json({
          success: true,
          status: "CONFIRMING",
          paymentStatus: payment.status,
          message:
            "Payment received. Your booking is being confirmed.",
        });
      }
    }


    /**
 * Booking cancelled after payment (seat full)
 */
if (
  registration &&
  registration.status === "CANCELLED"
) {
  return res.json({
    success: false,
    status: "CANCELLED",
    paymentStatus: payment.status,
    message:
      "Payment was successful but the workshop was full. Your booking was cancelled and a refund will be processed.",
  });
}

    /**
     * Booking fully confirmed
     */
    if (
      registration &&
      registration.status === "CONFIRMED"
    ) {
      return res.json({
        success: true,
        status: "CONFIRMED",
        paymentStatus: payment.status,
        registrationId: registration._id,
        message:
          "Your booking is confirmed. A confirmation email has been sent.",
      });
    }

    /**
     * Fallback (should rarely happen)
     */
    return res.json({
      success: true,
      status: "PROCESSING",
      paymentStatus: payment.status,
      message:
        "Your payment is being processed. Please wait.",
    });
  } catch (error) {
    console.error(
      "❌ Payment status check error:",
      error
    );
    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch payment status. Please try again shortly.",
    });
  }
};
