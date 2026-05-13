import express from "express";
import { getTenantBySlug } from "../controllers/tenantController.js";

const router = express.Router();

router.get("/tenant/:slug", getTenantBySlug);

export default router;
