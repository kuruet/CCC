import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      sparse: true,
    },
    razorpay_signature: {
      type: String,
    },

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

    receipt: String,
    method: String, // card / upi / netbanking

    // 🔹 SLOT SNAPSHOT
    slot: {
      type: String,
      enum: ["SLOT_1", "SLOT_2"],
      required: true,
      index: true,
    },

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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workshopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ razorpay_order_id: 1 }, { unique: true });
paymentSchema.index(
  { razorpay_payment_id: 1 },
  { unique: true, sparse: true }
);

export default mongoose.model("Payment", paymentSchema);
