import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";

const app = express();

/**
 * ✅ CORS CONFIG (CRITICAL)
 * - Required for httpOnly cookies
 * - NO wildcard origin
 * - Explicit origin echoing
 */
const allowedOrigins = [
  "https://creativecaricatureclub.com",
  "https://www.creativecaricatureclub.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ✅ Cookie parser (required for admin auth)
 */
app.use(cookieParser());

/**
 * ✅ Razorpay Webhook
 * MUST come BEFORE bodyParser.json()
 */
app.use("/api/webhooks", webhookRoutes);

/**
 * ✅ Normal JSON parsing
 */
app.use(bodyParser.json());

// Existing routes
app.use("/api/payment", paymentRoutes);
app.use("/api/registrations", registrationRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

app.use("/api/public", publicRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
