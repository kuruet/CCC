import express from "express";
import {
  getRegistrations,
  updateRegistrationFlags,
} from "../controllers/registrationController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/**
 * Dashboard registrations (ADMIN ONLY)
 * GET /api/registrations
 */
router.get("/", adminAuthMiddleware, getRegistrations);

/**
 * Update registration flags (ADMIN ONLY)
 * PATCH /api/registrations/:id
 */
router.patch("/:id", adminAuthMiddleware, updateRegistrationFlags);

export default router;
