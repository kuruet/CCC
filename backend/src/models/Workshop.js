import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      default: 1999,
    },

    date: {
      type: Date,
      required: true,
    },

    /**
     * 🔒 ATOMIC SEAT COUNTERS (SOURCE OF TRUTH)
     * Used ONLY by webhook for final confirmation
     */
    slots: {
      SLOT_1: {
        confirmed: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
      SLOT_2: {
        confirmed: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workshop", workshopSchema);
