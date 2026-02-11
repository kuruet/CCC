import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import paymentRoutes from "./routes/paymentRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { razorpayWebhookHandler } from "./controllers/razorpayWebhookController.js";

const app = express();

/**
 * =========================
 * CORS (SAFE + RAZORPAY OK)
 * =========================
 */
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://creativecaricatureclub.com",
        "https://www.creativecaricatureclub.com",
      ]
    : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Razorpay / server-to-server (no origin header)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);

/**
 * =========================
 * RAZORPAY WEBHOOK (CRITICAL)
 * =========================
 * MUST be BEFORE json parser
 * MUST use raw body
 * MUST be defined at app-level
 */
app.post(
  "/api/webhooks/razorpay",
  bodyParser.raw({ type: "application/json" }),
  razorpayWebhookHandler
);

/**
 * =========================
 * NORMAL MIDDLEWARE
 * =========================
 */
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/payment", paymentRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api", publicRoutes);


/**
 * =========================
 * HEALTH
 * =========================
 */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
