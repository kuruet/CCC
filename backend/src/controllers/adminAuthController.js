import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * POST /api/admin/login
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

   const isProduction = process.env.NODE_ENV === "production";

res.cookie("admin_token", token, {
  httpOnly: true,
  secure: isProduction,                 // HTTPS only in prod
  sameSite: isProduction ? "none" : "lax",
  maxAge: 12 * 60 * 60 * 1000,
});


    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/admin/logout
 */
export const adminLogout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Admin logout error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

