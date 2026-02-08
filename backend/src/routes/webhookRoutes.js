import express from "express";
import bodyParser from "body-parser";
import { razorpayWebhookHandler } from "../controllers/razorpayWebhookController.js";

const router = express.Router();

/**
 * Razorpay Webhook Route
 * ----------------------
 * IMPORTANT:
 * - Uses raw body for signature verification
 * - Must NOT use express.json() here
 * - Backend-authoritative payment finalization
 */
router.post(
  "/razorpay",
  bodyParser.raw({
    type: "application/json",
    limit: "1mb", // 🔒 prevent abuse, Razorpay payloads are small
  }),
  razorpayWebhookHandler
);

export default router;
