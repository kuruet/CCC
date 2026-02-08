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
const confirmedCount = await Registration.countDocuments({
  workshopId: workshop._id,
  slot,
  status: "CONFIRMED",
});

if (confirmedCount >= 30) {
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
  status: "CONFIRMED",
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
  console.log('\n================ VERIFY PAYMENT START ================');
  console.log('Incoming body:', req.body);

  try {
    const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  // workshopId,
} = req.body;


    console.log('Step 1: Validating request body');

   if (!razorpay_order_id) {
  console.log('❌ Validation failed');
  return res.status(400).json({
    success: false,
    message: 'Missing required payment details',
  });
}


    console.log('✅ Validation passed');

    console.log('Step 2: Checking existing payment');
let payment = await Payment.findOne({ razorpay_order_id });

if (!payment) {
  return res.status(404).json({
    success: false,
    message: "Payment order not found",
  });
}

console.log('Step 3: Fetching workshop from payment');
const workshop = await Workshop.findById(payment.workshopId);

if (!workshop) {
  console.log('❌ Workshop not found');
  return res.status(404).json({
    success: false,
    message: 'Workshop not found',
  });
}


   if (!payment) {
  return res.status(404).json({
    success: false,
    message: "Payment order not found",
  });
}

const userId = payment.userId;



    if (payment && payment.status === 'SUCCESS') {
      console.log('⚠️ Payment already verified');
      return res.json({
        success: true,
        message: 'Payment already verified',
        paymentId: payment._id,
      });
    }

    if (razorpay_payment_id) {
      console.log('Step 4: Verifying Razorpay signature');

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        console.log('❌ Signature mismatch');
        if (payment) {
          payment.status = 'FAILED';
          await payment.save();
        }
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed',
        });
      }

      console.log('✅ Signature verified');
    }

    console.log('Step 5: Creating or updating payment');
    const newStatus = razorpay_payment_id ? 'SUCCESS' : 'FAILED';

    if (payment) {
      payment.razorpay_payment_id = razorpay_payment_id || payment.razorpay_payment_id;
      payment.razorpay_signature = razorpay_signature || payment.razorpay_signature;
      payment.status = newStatus;
      payment = await payment.save();
    } 
   // no-op: payment already exists from order creation


 const user = await User.findById(userId);
if (!user) {
  console.warn("⚠️ User not found for registration snapshot:", userId);
  return res.status(404).json({
    success: false,
    message: "User not found for payment",
  });
}


  // STEP 2: Frontend verification is informational only
// Registration confirmation will be handled by webhook in STEP 3


    console.log('================ VERIFY PAYMENT END ================\n');

   return res.json({
  success: payment.status === 'SUCCESS',
  message:
    payment.status === 'SUCCESS'
      ? 'Payment verified. Booking will be confirmed shortly.'
      : 'Payment failed',
  paymentId: payment._id,
  workshopTitle: workshop.title,
  paymentStatus: payment.status,
});

  } catch (error) {
    console.error('🔥 VERIFY PAYMENT ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during payment verification',
    });
  }
};