import mongoose from "mongoose";
const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    workshopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      required: true,
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },

    status: {
      type: String,
      enum: ['CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED',
    },

    // 🔮 Future-ready fields
    attended: {
      type: Boolean,
      default: false,
    },

    certificateIssued: {
      type: Boolean,
      default: false,
    },
      email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Confirmation email tracking
    confirmationSent: {
      type: Boolean,
      default: false,
    },

    confirmationSentAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

/**
 * 🚨 Prevent duplicate registration
 * One user → one workshop → one registration
 */
registrationSchema.index(
  { userId: 1, workshopId: 1 },
  { unique: true }
);

export default mongoose.model('Registration', registrationSchema);
