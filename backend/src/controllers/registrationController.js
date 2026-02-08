import Registration from "../models/Registration.js";

/**
 * GET /api/registrations
 * Dashboard – fetch confirmed registrations
 *
 * NOTE:
 * - Read-only endpoint
 * - CONFIRMED remains the only visible state for admin
 * - Safe even after lifecycle expansion
 */
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      status: "CONFIRMED",
    })
      .select(
        "_id name email phone attended certificateIssued createdAt"
      )
      .sort({ createdAt: -1 })
      .lean(); // safe for read-only dashboards

    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("[getRegistrations] Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};

/**
 * PATCH /api/registrations/:id
 * Dashboard-only: update attended / certificateIssued flags
 *
 * HARD RULE:
 * - Only CONFIRMED registrations can be modified
 * - No lifecycle state changes allowed here
 */
export const updateRegistrationFlags = async (req, res) => {
  try {
    const { id } = req.params;
    const { attended, certificateIssued } = req.body;

    // 🔒 Strict whitelist validation
    const updateData = {};

    if (typeof attended === "boolean") {
      updateData.attended = attended;
    }

    if (typeof certificateIssued === "boolean") {
      updateData.certificateIssued = certificateIssued;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const updatedRegistration =
      await Registration.findOneAndUpdate(
        {
          _id: id,
          status: "CONFIRMED", // 🔒 terminal-state protection
        },
        {
          $set: updateData,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("_id attended certificateIssued");

    if (!updatedRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found or not confirmed",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedRegistration,
    });
  } catch (error) {
    console.error(
      "[updateRegistrationFlags] Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update registration",
    });
  }
};
