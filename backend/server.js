import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env only if not provided by host (Railway)
if (!process.env.RAZORPAY_KEY_ID) {
  dotenv.config({ path: path.join(__dirname, ".env") });
}

// 🚨 Fail fast if critical env vars missing
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("❌ Razorpay env vars not loaded");
}

if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY missing — emails will fail");
}

// Dynamic import AFTER env is loaded
const { default: app } = await import("./src/app.js");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
