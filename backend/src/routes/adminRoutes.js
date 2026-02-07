import express from "express";
import {
  getAdminRegistrations,
  getSeatStats,
} from "../controllers/adminController.js";
import { getNotifySubscribers } from "../controllers/notifyAdminController.js";
import {
  adminLogin,
  adminLogout,
} from "../controllers/adminAuthController.js";
import { getAdminMe } from "../controllers/adminMeController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/**
 * =========================
 * AUTH ROUTES (PUBLIC)
 * =========================
 */
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

/**
 * =========================
 * AUTH CHECK (PROTECTED)
 * =========================
 */
router.get("/me", adminAuthMiddleware, getAdminMe);

/**
 * =========================
 * ADMIN ROUTES (PROTECTED)
 * =========================
 */

// Get all registrations with payment + slot info
router.get(
  "/registrations",
  adminAuthMiddleware,
  getAdminRegistrations
);

// Get seat statistics (slot-wise)
router.get(
  "/seat-stats",
  adminAuthMiddleware,
  getSeatStats
);

// Get notify-me subscribers list
router.get(
  "/notify-subscribers",
  adminAuthMiddleware,
  getNotifySubscribers
);

export default router;
