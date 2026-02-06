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

    // 🔹 SLOT SELECTION
    slot: {
      type: String,
      enum: ["SLOT_1", "SLOT_2"],
      required: true,
      index: true,
    },

    // 🔒 Snapshot fields
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
      index: true,
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

// 🔒 Prevent duplicate registration per workshop
registrationSchema.index(
  { userId: 1, workshopId: 1 },
  { unique: true }
);

// 🔒 Seat counting helper index
registrationSchema.index(
  { workshopId: 1, slot: 1, status: 1 }
);

export default mongoose.model("Registration", registrationSchema);
