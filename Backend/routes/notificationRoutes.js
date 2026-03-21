import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/my-notifications", protect, getMyNotifications);
router.put("/:id/read", protect, markNotificationRead);
router.put("/mark-all-read", protect, markAllNotificationsRead);

export default router;
