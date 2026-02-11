import express from "express";
import { getPublicSeatStats } from "../controllers/publicController.js";
import { createNotifySubscriber } from "../controllers/notifyController.js";

const router = express.Router();

router.get("/seat-stats", getPublicSeatStats);

router.post("/notify", createNotifySubscriber);

export default router;
