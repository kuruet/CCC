// backend/src/controllers/notifyAdminController.js
import NotifySubscriber from "../models/NotifySubscriber.js";

/**
 * GET /api/admin/notify-subscribers
 * Read-only list of users who opted for "Notify Me"
 */
export const getNotifySubscribers = async (req, res) => {
  try {
    const subscribers = await NotifySubscriber.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      count: subscribers.length,
      subscribers: subscribers.map((sub) => ({
        id: sub._id,
        name: sub.name,
        email: sub.email,
        mobile: sub.mobile,
        createdAt: sub.createdAt,
      })),
    });
  } catch (error) {
    console.error("❌ Admin get notify subscribers error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notify subscribers",
    });
  }
};
