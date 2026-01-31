import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import validateCreateOrder from "../middleware/validateCreateOrder.js";

const router = express.Router();

router.post("/create-order", validateCreateOrder, createPaymentOrder);
router.post("/verify", verifyPayment);

export default router;
