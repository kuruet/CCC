// backend/src/routes/adminRoutes.js
import express from "express";
import { getAdminRegistrations, getSeatStats } from "../controllers/adminController.js";
import { getNotifySubscribers } from "../controllers/notifyAdminController.js";

const router = express.Router();

/**
 * ⚠️ ADMIN ROUTES (READ-ONLY)
 * NOTE:
 * - No auth middleware yet (as discussed)
 * - Do NOT expose publicly in production without protection
 */

// Get all registrations with payment + slot info
router.get("/registrations", getAdminRegistrations);

// Get seat statistics (slot-wise)
router.get("/seat-stats", getSeatStats);

// Get notify-me subscribers list
router.get("/notify-subscribers", getNotifySubscribers);

export default router;
