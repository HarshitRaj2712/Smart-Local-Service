import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import ProviderProfile from "../models/ProviderProfile.js";
import ChatMessage from "../models/ChatMessage.js";

const canAccessBookingChat = async (bookingId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return { allowed: false, message: "Invalid booking id" };
  }

  const booking = await Booking.findById(bookingId)
    .populate("user", "_id")
    .populate({
      path: "provider",
      populate: { path: "user", select: "_id" },
    });

  if (!booking) {
    return { allowed: false, message: "Booking not found" };
  }

  const userIdStr = String(userId);
  const isBookingUser = String(booking.user?._id) === userIdStr;
  const providerUserId = booking.provider?.user?._id;
  const isProviderUser = String(providerUserId || "") === userIdStr;

  if (!isBookingUser && !isProviderUser) {
    return { allowed: false, message: "Not authorized for this booking chat" };
  }

  return {
    allowed: true,
    booking,
    isBookingUser,
    providerUserId,
  };
};

export const getBookingMessages = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const access = await canAccessBookingChat(bookingId, req.user._id);

    if (!access.allowed) {
      return res.status(403).json({ message: access.message });
    }

    const messages = await ChatMessage.find({ booking: bookingId })
      .populate("sender", "name role profilePic")
      .populate("receiver", "name role profilePic")
      .sort({ createdAt: 1 });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const currentUserId = String(req.user._id);

    const messages = await ChatMessage.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "_id name role profilePic")
      .populate("receiver", "_id name role profilePic")
      .populate({
        path: "booking",
        populate: [
          { path: "user", select: "_id name role profilePic" },
          {
            path: "provider",
            select: "_id serviceType user",
            populate: { path: "user", select: "_id name role profilePic" },
          },
        ],
      })
      .sort({ createdAt: -1 });

    const byBooking = new Map();

    for (const message of messages) {
      const booking = message.booking;
      if (!booking?._id) continue;

      const bookingId = String(booking._id);
      if (byBooking.has(bookingId)) continue;

      const bookingUser = booking.user;
      const providerUser = booking.provider?.user;

      const counterpart =
        String(bookingUser?._id || "") === currentUserId
          ? providerUser
          : bookingUser;

      byBooking.set(bookingId, {
        bookingId,
        latestMessage: message.message,
        latestMessageAt: message.createdAt,
        serviceType: booking.provider?.serviceType || "Service",
        counterpart: counterpart
          ? {
              id: counterpart._id,
              name: counterpart.name,
              role: counterpart.role,
              profilePic: counterpart.profilePic || "",
            }
          : null,
      });
    }

    return res.json(Array.from(byBooking.values()));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resolveChatReceiverId = async (bookingId, senderId) => {
  const booking = await Booking.findById(bookingId)
    .populate("user", "_id")
    .populate({
      path: "provider",
      populate: { path: "user", select: "_id" },
    });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const senderIdStr = String(senderId);
  const bookingUserId = String(booking.user?._id || "");
  const providerUserId = String(booking.provider?.user?._id || "");

  if (![bookingUserId, providerUserId].includes(senderIdStr)) {
    throw new Error("Not authorized for this booking chat");
  }

  return {
    booking,
    receiverId: senderIdStr === bookingUserId ? providerUserId : bookingUserId,
  };
};

export const isUserProviderForBooking = async (bookingId, userId) => {
  const providerProfile = await ProviderProfile.findOne({ user: userId });
  if (!providerProfile) return false;

  const booking = await Booking.findById(bookingId).select("provider");
  if (!booking) return false;

  return String(booking.provider) === String(providerProfile._id);
};
