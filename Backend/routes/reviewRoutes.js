import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles("user"),
  createReview
);

export default router;