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

    const slot = payment.slot;

    // 🔒 FINAL SEAT LOCK (webhook is authority)
    const confirmedCount = await Registration.countDocuments({
      workshopId: payment.workshopId,
      slot,
      status: "CONFIRMED",
    });

    if (confirmedCount >= 30) {
      payment.status = "FAILED";
      await payment.save();

      console.error("❌ Slot full. Payment rejected in webhook:", slot);
      return res.json({ status: "slot_full_rejected" });
    }

    // 🔒 Mark payment successful
    payment.status = "SUCCESS";
    payment.razorpay_payment_id = paymentEntity.id;
    payment.method = paymentEntity.method;
    await payment.save();

    // 🔒 Create / update registration
    const registration = await Registration.findOneAndUpdate(
      {
        userId: payment.userId,
        workshopId: payment.workshopId,
      },
      {
        $set: {
          paymentId: payment._id,
          status: "CONFIRMED",
          slot,

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

    console.log("✅ Payment confirmed via webhook & registration locked");
    return res.json({ status: "ok" });
  } catch (error) {
    console.error("🔥 Webhook processing error:", error);
    return res.status(500).send("Webhook error");
  }
};
