import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import { getPaymentStatus } from "../controllers/paymentStatusController.js";
import validateCreateOrder from "../middleware/validateCreateOrder.js";


const router = express.Router();

router.post("/create-order", validateCreateOrder, createPaymentOrder);

// 🔒 Legacy endpoint (kept for backward compatibility)
router.post("/verify", verifyPayment);

// 🔓 User trust layer (READ-ONLY, SAFE FOR POLLING)
router.get("/status/:orderId", getPaymentStatus);


export default router;
