import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAdminAnalytics } from "../controllers/adminController.js";
import { getMonthlyRevenue } from "../controllers/adminController.js";
import { getProviderLeaderboard } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/analytics",
  protect,
  authorizeRoles("admin"),
  getAdminAnalytics
);

router.get(
  "/monthly-revenue",
  protect,
  authorizeRoles("admin"),
  getMonthlyRevenue
);

router.get(
  "/leaderboard",
  protect,
  authorizeRoles("admin"),
  getProviderLeaderboard
);

export default router;