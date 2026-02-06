import Registration from "../models/Registration.js";

/**
 * GET /api/registrations
 * Dashboard – fetch confirmed registrations
 */
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      status: "CONFIRMED",
    })
      .select(
        "_id name email phone attended certificateIssued createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};


 
/**
 * PATCH /api/registrations/:id
 * Update attended / certificateIssued flags (dashboard only)
 */
export const updateRegistrationFlags = async (req, res) => {
  try {
    const { id } = req.params;
    const { attended, certificateIssued } = req.body;

    // Whitelist validation
    const updateData = {};

    if (typeof attended === "boolean") {
      updateData.attended = attended;
    }

    if (typeof certificateIssued === "boolean") {
      updateData.certificateIssued = certificateIssued;
    }

    // No valid fields provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const updatedRegistration = await Registration.findOneAndUpdate(
      { _id: id, status: "CONFIRMED" }, // extra safety
      { $set: updateData },
      { new: true }
    ).select("_id attended certificateIssued");

    if (!updatedRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update registration",
    });
  }
};
