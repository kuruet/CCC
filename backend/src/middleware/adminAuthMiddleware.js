import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const admin = await Admin.findById(decoded.adminId).select("_id email");

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default adminAuthMiddleware;
