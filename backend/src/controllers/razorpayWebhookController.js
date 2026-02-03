// src/controllers/razorpayWebhookController.js
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
import { sendRegistrationConfirmation } from "../services/emailService.js";

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

   console.log("📡 Razorpay webhook:", event.event);


    if (event.event !== "payment.captured") {
      return res.json({ status: "ignored_event" });
    }

    const paymentEntity = event.payload.payment.entity;

    const payment = await Payment.findOne({
      razorpay_order_id: paymentEntity.order_id,
    });

    if (!payment) {
      console.warn("⚠️ Payment not found for webhook");
      return res.json({ status: "ignored" });
    }

    if (payment.status === "SUCCESS") {
      console.log("ℹ️ Payment already processed");
      return res.json({ status: "already_processed" });
    }

    const user = await User.findById(payment.userId);

    if (!user) {
      console.warn("⚠️ User not found for webhook payment");
      return res.json({ status: "user_missing" });
    }

    payment.status = "SUCCESS";
    payment.razorpay_payment_id = paymentEntity.id;
    await payment.save();

   const registration = await Registration.findOneAndUpdate(
  {
    userId: payment.userId,
    workshopId: payment.workshopId,
  },
  {
    $set: {
      paymentId: payment._id,
      status: "CONFIRMED",

      // 🔒 SNAPSHOT (immutable)
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  },
  { upsert: true, new: true }
);



    Promise.resolve()
  .then(() => sendRegistrationConfirmation(registration._id))
  .catch((err) =>
    console.error("❌ Webhook email failed:", err.message)
  );


    console.log("✅ Payment confirmed via webhook & email sent");

    res.json({ status: "ok" });
  } catch (error) {
    console.error("🔥 Webhook processing error:", error);
    res.status(500).send("Webhook error");
  }
};
