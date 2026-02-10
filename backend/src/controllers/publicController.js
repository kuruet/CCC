import Workshop from "../models/Workshop.js";


const MAX_SEATS_PER_SLOT = Number(process.env.MAX_SEATS_PER_SLOT || 30);


export const getPublicSeatStats = async (req, res) => {
  try {
    const workshop = await Workshop.findOne().lean();

if (!workshop || !workshop.slots) {
  return res.status(404).json({ success: false });
}

const slot1Filled = workshop.slots.SLOT_1.confirmed || 0;
const slot2Filled = workshop.slots.SLOT_2.confirmed || 0;


    return res.json({
      success: true,
      slots: {
        SLOT_1: {
          filled: slot1Filled,
          remaining: Math.max(MAX_SEATS_PER_SLOT - slot1Filled, 0),

        },
        SLOT_2: {
          filled: slot2Filled,
          remaining: Math.max(MAX_SEATS_PER_SLOT - slot1Filled, 0),

        },
      },
    });
  } catch (err) {
    console.error("❌ Public seat stats error:", err);
    return res.status(500).json({ success: false });
  }
};
