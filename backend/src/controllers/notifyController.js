import NotifySubscriber from "../models/NotifySubscriber.js";

/**
 * POST /api/notify
 * Public route
 */
export const createNotifySubscriber = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await NotifySubscriber.findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return res.json({
        success: true,
        message: "You are already on the notify list.",
      });
    }

    await NotifySubscriber.create({
      name,
      email,
      mobile,
    });

    return res.json({
      success: true,
      message: "Successfully added to notify list.",
    });
  } catch (error) {
    console.error("❌ Notify create error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save notification request",
    });
  }
};
