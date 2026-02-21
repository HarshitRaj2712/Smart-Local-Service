import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in users
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Only admin
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 🔥" });
});

export default router;