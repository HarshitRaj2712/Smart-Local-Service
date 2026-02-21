import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { createProviderProfile } from "../controllers/providerController.js";
import { getAllProviders, approveProvider, getApprovedProviders } from "../controllers/providerController.js";

const router = express.Router();

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllProviders
);

router.get("/approved", getApprovedProviders);

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

export default router;