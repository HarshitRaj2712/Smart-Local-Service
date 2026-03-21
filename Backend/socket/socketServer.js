import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ChatMessage from "../models/ChatMessage.js";
import Notification from "../models/Notification.js";
import { resolveChatReceiverId } from "../controllers/chatController.js";

const parseToken = (token) => {
  if (!token) return null;
  if (token.startsWith("Bearer ")) {
    return token.split(" ")[1];
  }
  return token;
};

export const registerSocketHandlers = (io) => {
  io.use(async (socket, next) => {
    try {
      const rawToken = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
      const token = parseToken(rawToken);

      if (!token) {
        return next(new Error("Authentication error: token missing"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("_id name role");

      if (!user) {
        return next(new Error("Authentication error: user not found"));
      }

      socket.user = user;
      return next();
    } catch (error) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = String(socket.user._id);

    socket.join(`user:${userId}`);

    socket.on("chat:join-booking", async ({ bookingId }) => {
      if (!bookingId) return;

      try {
        const { booking } = await resolveChatReceiverId(bookingId, socket.user._id);
        if (!booking) return;
        socket.join(`booking:${bookingId}`);
      } catch {
        // Do nothing for unauthorized join requests.
      }
    });

    socket.on("chat:send-message", async ({ bookingId, message }) => {
      try {
        const cleanMessage = typeof message === "string" ? message.trim() : "";

        if (!bookingId || !cleanMessage) {
          return;
        }

        const { receiverId } = await resolveChatReceiverId(bookingId, socket.user._id);

        const savedMessage = await ChatMessage.create({
          booking: bookingId,
          sender: socket.user._id,
          receiver: receiverId,
          message: cleanMessage,
        });

        const populatedMessage = await ChatMessage.findById(savedMessage._id)
          .populate("sender", "name role profilePic")
          .populate("receiver", "name role profilePic");

        io.to(`booking:${bookingId}`).emit("chat:new-message", populatedMessage);

        const notification = await Notification.create({
          user: receiverId,
          type: "chat",
          title: "New message",
          body: `${socket.user.name} sent a message`,
          relatedBooking: bookingId,
        });

        io.to(`user:${receiverId}`).emit("notification:new", notification);
      } catch {
        // Ignore malformed or unauthorized events.
      }
    });
  });
};
