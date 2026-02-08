import mongoose from "mongoose";

/**
 * Payment Schema
 * ----------------
 * IMPORTANT:
 * - Backward compatible
 * - No logic changes in STEP 1
 * - Existing payment records remain valid
 *
 * Legacy payment statuses are preserved.
 * Canonical payment states are added for future use.
 */

const paymentSchema = new mongoose.Schema(
  {
    // 🔹 Razorpay identifiers
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
  select: false, // 🔒 never leak via queries
},


    // 💰 Amount details
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

    /**
     * Payment lifecycle status
     *
     * Legacy values (DO NOT REMOVE):
     * - CREATED
     * - SUCCESS
     * - FAILED
     * - REFUNDED
     *
     * Canonical values (STEP 1 addition):
     * - INITIATED
     * - PAID
     *
     * NOTE:
     * No enforcement yet.
     * Mapping happens later when webhook becomes authoritative.
     */
    status: {
      type: String,
      enum: [
        // Legacy
        "CREATED",
        "SUCCESS",
        "FAILED",
        "REFUNDED",

        // Canonical (non-breaking additions)
        "INITIATED",
        "PAID",
      ],
      default: "CREATED", // ⛔ DO NOT CHANGE
      index: true,
    },

    // 🧾 Optional Razorpay receipt
    receipt: String,

    // 💳 Payment method snapshot
    method: String, // card / upi / netbanking

    // 🔹 SLOT SNAPSHOT (important for reconciliation)
    slot: {
      type: String,
      enum: ["SLOT_1", "SLOT_2"],
      required: true,
      index: true,
    },

    // 📧 User contact snapshot
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

    // 🔗 Ownership
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

    isTerminal: {
  type: Boolean,
  default: false,
  index: true,
},


    // 🕒 Future audit helper
    lastStatusUpdatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// 🔒 Idempotency & reconciliation safety
paymentSchema.index({ razorpay_order_id: 1 }, { unique: true });

paymentSchema.index(
  { razorpay_payment_id: 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: {
      razorpay_payment_id: { $exists: true },
    },
  }
);


export default mongoose.model("Payment", paymentSchema);
