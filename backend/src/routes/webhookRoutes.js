import express from "express";
import bodyParser from "body-parser";
import { razorpayWebhookHandler } from "../controllers/webhookController.js";

const router = express.Router();

router.post(
  "/razorpay",
  bodyParser.raw({ type: "application/json" }),
  razorpayWebhookHandler
);

export default router;
