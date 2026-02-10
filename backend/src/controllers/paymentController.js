import Payment from "../models/Payment.js";
import crypto from "crypto";
import User from "../models/User.js";
import Workshop from "../models/Workshop.js";
import { createOrder } from "../services/razorpayService.js";
import Registration from "../models/Registration.js";
import { sendRegistrationConfirmation } from "../services/emailService.js";
import {
  createRegistration,
  attachPaymentToRegistration,
  transitionRegistrationState,
} from "../services/registrationService.js";

import {
  createPayment,
  markPaymentInitiated,
} from "../services/paymentService.js";

import { REGISTRATION_STATES } from "../utils/registrationStateMachine.js";

const MAX_SEATS_PER_SLOT = Number(process.env.MAX_SEATS_PER_SLOT || 30);



export const createPaymentOrder = async (req, res) => {
  try {
    const { name, email, phone, slot } = req.body;

    console.log('📥 Create payment request:', req.body);

    if (!name || !email || !phone || !slot) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!["SLOT_1", "SLOT_2"].includes(slot)) {
  return res.status(400).json({ message: "Invalid slot selected" });
}

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }

 

 

    const workshop = await Workshop.findOne();
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    // 🔒 Soft seat check (webhook is final authority)
// 🔒 Soft seat check (Workshop counter, NOT authoritative)
const slotInfo = workshop.slots?.[slot];

if (!slotInfo) {
  return res.status(400).json({
    success: false,
    message: "Invalid workshop slot configuration",
  });
}

if (slotInfo.confirmed >= MAX_SEATS_PER_SLOT) {
  return res.status(409).json({
    success: false,
    message: "Selected slot is full",
  });
}



// 🔒 Backend-owned registration (created BEFORE payment)
// 🔒 STEP: Block duplicate CONFIRMED registration per workshop
const existingRegistration = await Registration.findOne({
  userId: user._id,
  workshopId: workshop._id,
  status: { $in: ["PAYMENT_INIT", "PAID", "CONFIRMED"] },
});


if (existingRegistration) {
  return res.status(409).json({
    success: false,
    message:
      "mobile number or email already registered for this workshop. Use different one",
  });
}

// 🔒 Backend-owned registration (created BEFORE payment)
const registration = await createRegistration({
  userId: user._id,
  workshopId: workshop._id,
  slot,
  name: user.name,
  email: user.email,
  phone: user.phone,
});

    const amountInPaise = Math.round(workshop.price * 100);

    console.log('💰 Workshop price (₹):', workshop.price);
    console.log('💰 Razorpay amount (paise):', amountInPaise);

    const order = await createOrder(amountInPaise, 'INR');

    console.log('🧾 Razorpay order created:', order.id);

   const payment = await createPayment({
  razorpay_order_id: order.id,
  amount: workshop.price,
  currency: "INR",
  userId: user._id,
  workshopId: workshop._id,
  slot,
  email: user.email,
  phone: user.phone,
});

await attachPaymentToRegistration(registration._id, payment._id);

await transitionRegistrationState(
  registration._id,
  REGISTRATION_STATES.PAYMENT_INIT
);

await markPaymentInitiated(payment._id);


    return res.status(200).json({
      success: true,
      order_id: order.id,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (error) {
  console.error('❌ createPaymentOrder error:', error);

  // 🔒 Handle duplicate phone/email (Mongo unique index)
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This mobile number or email is already registered. Please use a different one.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
}

};

export const verifyPayment = async (req, res) => {
  return res.status(410).json({
    success: false,
    message:
      "Payment verification is handled exclusively via Razorpay webhook.",
  });
};
