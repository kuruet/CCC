import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
      unique: true,
    },
    razorpay_payment_id: {
      type: String,
      required: false,
    },
    razorpay_signature: {
      type: String,
      required: false,
    },

    // 🔹 Payment info
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED",
    },

    // 🔹 Razorpay metadata (optional, future-proof)
    receipt: {
      type: String,
    },
    method: {
      type: String, // card / upi / netbanking
    },

    // 🔹 Snapshot of user details at payment time
    email: {
      type: String,
    },
    phone: {
      type: String,
    },

    // 🔹 Relations
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

export default mongoose.model("Payment", paymentSchema);
