import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	getBookingMessages,
	getMyConversations,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/conversations", protect, getMyConversations);
router.get("/:bookingId/messages", protect, getBookingMessages);

export default router;
