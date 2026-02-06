import Registration from "../models/Registration.js";

const TOTAL_SEATS_PER_SLOT = 30;

export const getPublicSeatStats = async (req, res) => {
  try {
    const [slot1Filled, slot2Filled] = await Promise.all([
      Registration.countDocuments({ slot: "SLOT_1", status: "CONFIRMED" }),
      Registration.countDocuments({ slot: "SLOT_2", status: "CONFIRMED" }),
    ]);

    return res.json({
      success: true,
      slots: {
        SLOT_1: {
          filled: slot1Filled,
          remaining: Math.max(TOTAL_SEATS_PER_SLOT - slot1Filled, 0),
        },
        SLOT_2: {
          filled: slot2Filled,
          remaining: Math.max(TOTAL_SEATS_PER_SLOT - slot2Filled, 0),
        },
      },
    });
  } catch (err) {
    console.error("❌ Public seat stats error:", err);
    return res.status(500).json({ success: false });
  }
};
