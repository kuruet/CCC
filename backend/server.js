import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔒 Load env only if not already provided by the hosting environment (Railway)
if (!process.env.RAZORPAY_KEY_ID) {
  dotenv.config({ path: path.join(__dirname, ".env") });
}

// Debug (remove in production)
console.log("RAZORPAY_KEY_ID status:", process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing");

// Railway uses the PORT variable; default to 5000 for local dev
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("❌ Razorpay env vars not loaded");
}

// 🔥 IMPORTANT: dynamic import AFTER dotenv
const { default: app } = await import("./src/app.js");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    // Bind to 0.0.0.0 for Railway/Docker compatibility
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });