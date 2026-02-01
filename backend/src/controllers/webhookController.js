import crypto from "crypto";
import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const receivedSignature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (receivedSignature !== expectedSignature) {
      console.error("❌ Invalid Razorpay webhook signature");
      return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log("📡 Razorpay webhook received:", event);

    // 🔹 PAYMENT CAPTURED
    if (event === "payment.captured") {
      const paymentId = payload.payment.entity.order_id;

      const payment = await Payment.findOne({
        razorpay_order_id: paymentId,
      });

      if (!payment) return res.json({ status: "ok" });

      payment.status = "SUCCESS";
      await payment.save();

      console.log("✅ Payment captured via webhook:", paymentId);
    }

    // 🔹 PAYMENT FAILED
    if (event === "payment.failed") {
      const paymentId = payload.payment.entity.order_id;

      const payment = await Payment.findOne({
        razorpay_order_id: paymentId,
      });

      if (!payment) return res.json({ status: "ok" });

      payment.status = "FAILED";
      await payment.save();

      // Rollback registration if exists
      await Registration.deleteOne({
        paymentId: payment._id,
      });

      console.log("❌ Payment failed via webhook:", paymentId);
    }

    return res.json({ status: "ok" });
  } catch (err) {
    console.error("🔥 Webhook error:", err);
    return res.status(500).send("Webhook error");
  }
};
