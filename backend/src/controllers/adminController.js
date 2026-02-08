// backend/src/controllers/adminController.js
import Registration from "../models/Registration.js";
import { recoverPaymentById } from "../services/paymentRecoveryService.js";

import Payment from "../models/Payment.js";
import User from "../models/User.js";

const TOTAL_SEATS_PER_SLOT = 30;

/**
 * GET /api/admin/registrations
 * Read-only list of confirmed registrations
 */
export const getAdminRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      status: "CONFIRMED",
    })
      .populate("userId", "name email phone")
      .populate("paymentId", "status method amount")
      .sort({ createdAt: -1 })
      .lean();

    const data = registrations.map((reg) => ({
      registrationId: reg._id,
      name: reg.name || reg.userId?.name || "N/A",
      email: reg.email || reg.userId?.email || "N/A",
      phone: reg.phone || reg.userId?.phone || "N/A",
      slot: reg.slot,
      paymentStatus: reg.paymentId?.status || "UNKNOWN",
      paymentMethod: reg.paymentId?.method || "UNKNOWN",
      createdAt: reg.createdAt,
    }));

    return res.json({
      success: true,
      count: data.length,
      registrations: data,
    });
  } catch (error) {
    console.error("❌ Admin get registrations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};

/**
 * GET /api/admin/seat-stats
 * Slot-wise live seat usage (SOURCE OF TRUTH)
 */
export const getSeatStats = async (req, res) => {
  try {
    // ✅ Count CONFIRMED registrations only
    const [slot1Filled, slot2Filled] = await Promise.all([
      Registration.countDocuments({
        slot: "SLOT_1",
        status: "CONFIRMED",
      }),
      Registration.countDocuments({
        slot: "SLOT_2",
        status: "CONFIRMED",
      }),
    ]);

    return res.json({
      success: true,
      totalSeatsPerSlot: TOTAL_SEATS_PER_SLOT,
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
  } catch (error) {
    console.error("❌ Admin get seat stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seat statistics",
    });
  }
};


/**
 * POST /api/admin/recover-payment/:paymentId
 * Manual admin recovery for stuck payments
 */
export const recoverPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const result = await recoverPaymentById(paymentId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        reason: result.reason,
      });
    }

    return res.json({
      success: true,
      message: "Payment recovery executed successfully",
    });
  } catch (error) {
    console.error("❌ Admin payment recovery error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment recovery failed",
    });
  }
};
