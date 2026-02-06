import express from "express";
import { getPublicSeatStats } from "../controllers/publicController.js";

const router = express.Router();

router.get("/seat-stats", getPublicSeatStats);

export default router;
