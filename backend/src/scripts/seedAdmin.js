import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables"
      );
    }

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Seeding skipped.");
      process.exit(0);
    }

    await Admin.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    console.log("✅ Admin seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Admin seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
