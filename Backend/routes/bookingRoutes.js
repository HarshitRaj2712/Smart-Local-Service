import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {createBooking, getUserBookings } from "../controllers/bookingController.js";
import {getProviderBookings, updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles("user"),
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  authorizeRoles("user"),
  getUserBookings
);

router.get(
  "/provider-bookings",
  protect,
  authorizeRoles("provider"),
  getProviderBookings
);

router.put(
  "/update-status/:bookingId",
  protect,
  authorizeRoles("provider"),
  updateBookingStatus
);

export default router;