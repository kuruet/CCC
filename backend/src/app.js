import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ ADD
import publicRoutes from "./routes/publicRoutes.js";

const app = express();

app.use(cors());

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

// ✅ Admin routes (Phase 2)
app.use("/api/admin", adminRoutes);

app.use("/api/public", publicRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
