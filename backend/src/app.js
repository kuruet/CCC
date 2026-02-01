import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

const app = express();

app.use(cors());

/**
 * ✅ Razorpay Webhook
 * MUST come BEFORE bodyParser.json()
 * Uses raw body for signature verification
 */
app.use("/api/webhooks", webhookRoutes);

/**
 * ✅ Normal JSON parsing for rest of app
 */
app.use(bodyParser.json());

// Payment routes
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
