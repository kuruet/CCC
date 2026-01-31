import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔒 Load env FIRST (before any app / razorpay imports)
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug (keep once, then remove)
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);

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
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
