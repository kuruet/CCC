/**
 * GET /api/admin/me
 * Purpose:
 * - Verify admin authentication
 * - Used by frontend route guards
 * - Must be protected by adminAuthMiddleware
 */

export const getAdminMe = async (req, res) => {
  try {
    // adminAuthMiddleware guarantees req.admin exists
    return res.status(200).json({
      email: req.admin.email,
    });
  } catch (error) {
    console.error("Admin me error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
