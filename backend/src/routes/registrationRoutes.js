import express from "express";
import { getRegistrations, updateRegistrationFlags } from "../controllers/registrationController.js";

const router = express.Router();

/**
 * Dashboard registrations
 * GET /api/registrations
 */
router.get("/", getRegistrations);
router.patch("/:id", updateRegistrationFlags);

export default router;
