import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // 🔒 Razorpay identifiers
    razorpay_order_id: {
      type: String,
      required: true,
      index: true,
    },
    razorpay_payment_id: {
      type: String,
      index: true,
      sparse: true,
    },
    razorpay_signature: {
      type: String,
    },

    // 🔹 Payment info
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED", "REFUNDED"],
      default: "CREATED",
      index: true,
    },

    // 🔹 Razorpay metadata
    receipt: {
      type: String,
      index: true,
    },
    method: {
      type: String, // card / upi / netbanking
    },

    // 🔹 Snapshot of user details at payment time
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      set: (v) => v.replace(/\D/g, ""),
    },

    // 🔹 Relations
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    workshopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// 🔒 Uniqueness & idempotency guarantees
paymentSchema.index(
  { razorpay_order_id: 1 },
  { unique: true }
);

// Prevent duplicate successful captures for same Razorpay payment
paymentSchema.index(
  { razorpay_payment_id: 1 },
  { unique: true, sparse: true }
);

export default mongoose.model("Payment", paymentSchema);
