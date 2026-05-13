import express from "express";
import {
  createBusiness,
  getPlans,
  selectPlan,
  signup,
} from "../controllers/onboardingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/create", protect, createBusiness);
router.post("/select-plan", protect, selectPlan);
router.get("/plans", getPlans);

export default router;
