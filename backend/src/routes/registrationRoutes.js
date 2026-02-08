import express from "express";
import {
  getRegistrations,
  updateRegistrationFlags,
} from "../controllers/registrationController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/**
 * ADMIN REGISTRATION ROUTES
 * -------------------------
 * All routes here are ADMIN-ONLY.
 * Registration lifecycle is NOT modified here.
 * Payment & confirmation are handled elsewhere.
 */

// 🔒 Protect all admin registration routes
router.use(adminAuthMiddleware);

/**
 * Dashboard registrations
 * GET /api/registrations
 */
router.get("/", getRegistrations);

/**
 * Update registration flags
 * PATCH /api/registrations/:id
 *
 * Only allows:
 * - attended
 * - certificateIssued
 */
router.patch("/:id", updateRegistrationFlags);

export default router;
