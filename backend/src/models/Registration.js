import mongoose from "mongoose";

/**
 * Registration Schema
 * --------------------
 * IMPORTANT:
 * - This schema is BACKWARD COMPATIBLE.
 * - Existing registrations remain valid.
 * - No runtime behavior changes in STEP 1.
 *
 * Legacy status values are preserved.
 * New lifecycle states are added but NOT enforced yet.
 */

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

    // 🔒 Snapshot fields (immutable intent)
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

    // 🔹 Linked payment record
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    /**
     * Registration lifecycle status
     *
     * Legacy values (DO NOT REMOVE):
     * - PENDING
     * - CONFIRMED
     * - FAILED
     * - CANCELLED
     *
     * New lifecycle values (STEP 1 introduction):
     * - CREATED
     * - PAYMENT_INIT
     * - PAID
     *
     * NOTE:
     * Enforcement of valid transitions happens later
     * via registrationStateMachine.js
     */
    status: {
      type: String,
      enum: [
        // Legacy
        "PENDING",
        "CONFIRMED",
        "FAILED",
        "CANCELLED",

        // New (non-breaking additions)
        "CREATED",
        "PAYMENT_INIT",
        "PAID",
      ],
      default: "PENDING", // ⛔ DO NOT CHANGE YET
      index: true,
    },

    // 🕒 Future audit helpers (not used yet)
    lastStateTransitionAt: {
      type: Date,
    },

    isTerminal: {
  type: Boolean,
  default: false,
  index: true,
},


    // 🎓 Post-workshop flags
    attended: {
      type: Boolean,
      default: false,
    },

    certificateIssued: {
      type: Boolean,
      default: false,
    },

    // 📧 Confirmation tracking
    confirmationSent: {
      type: Boolean,
      default: false,
      index: true,
    },

  confirmationSentAt: {
  type: Date,
},


  },
  { timestamps: true }
);

// 🔒 Prevent duplicate registration per workshop
registrationSchema.index(
  { userId: 1, workshopId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["CREATED", "PAYMENT_INIT", "PAID", "CONFIRMED"] },
    },
  }
);



// 🔒 Seat counting helper index
registrationSchema.index(
  { workshopId: 1, slot: 1, status: 1 }
);

export default mongoose.model("Registration", registrationSchema);
