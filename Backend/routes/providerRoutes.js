import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createProviderProfile,
  updateProviderProfile,
  getMyProfile,
  getAllProviders,
  approveProvider,
  getApprovedProviders,
  getProviderById,
  getProviderAnalytics,
} from "../controllers/providerController.js";

const router = express.Router();

// 🔥 STATIC ROUTES FIRST

router.get("/approved", getApprovedProviders);

router.get(
  "/analytics",
  protect,
  authorizeRoles("provider"),
  getProviderAnalytics
);

router.get(
  "/my-profile",
  protect,
  authorizeRoles("provider"),
  getMyProfile
);

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllProviders
);

router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveProvider
);

router.post(
  "/create-profile",
  protect,
  authorizeRoles("provider"),
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "portfolio", maxCount: 5 },
  ]),
  createProviderProfile
);

router.put(
  "/update-profile",
  protect,
  authorizeRoles("provider"),
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "portfolio", maxCount: 5 },
  ]),
  updateProviderProfile
);

// 🔥 DYNAMIC ROUTE LAST
router.get("/:id", getProviderById);

export default router;