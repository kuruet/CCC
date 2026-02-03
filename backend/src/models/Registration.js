import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
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

    // 🔒 Snapshot fields (immutable business data)
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "FAILED", "CANCELLED"],
      default: "PENDING",
    },

    attended: {
      type: Boolean,
      default: false,
    },
    certificateIssued: {
      type: Boolean,
      default: false,
    },

    confirmationSent: {
      type: Boolean,
      default: false,
      index: true,
    },
    confirmationSentAt: Date,
  },
  { timestamps: true }
);

// 🔒 CRITICAL: prevent duplicate registrations
registrationSchema.index(
  { userId: 1, workshopId: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);
