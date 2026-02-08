// src/controllers/razorpayWebhookController.js
import crypto from "crypto";
import {
  handlePaymentCaptured,
  handlePaymentFailed,
} from "../services/webhookPaymentService.js";

export const razorpayWebhookHandler = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("❌ RAZORPAY_WEBHOOK_SECRET missing");
      return res.status(500).send("Webhook secret not configured");
    }

    const razorpaySignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("❌ Invalid Razorpay webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString());
    console.log("📡 Razorpay webhook event:", event.event);

    // ✅ Payment success
    if (event.event === "payment.captured") {
      await handlePaymentCaptured(event);
      return res.json({ status: "processed" });
    }

    // ✅ Payment failure / cancellation
    if (
      event.event === "payment.failed" ||
      event.event === "payment.cancelled"
    ) {
      await handlePaymentFailed(event);
      return res.json({ status: "processed" });
    }

    // 💤 Ignore unrelated events
    return res.json({ status: "ignored_event" });
  } catch (error) {
    console.error("🔥 Razorpay webhook error:", error);
    return res.status(500).send("Webhook error");
  }
};
