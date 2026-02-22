import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import ProviderProfile from "../models/ProviderProfile.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Must be completed booking
    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "Can only review completed bookings",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      booking: bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "Review already submitted",
      });
    }

    const review = await Review.create({
      booking: bookingId,
      user: req.user._id,
      provider: booking.provider,
      rating,
      comment,
    });

    // Recalculate provider rating
    const reviews = await Review.find({
      provider: booking.provider,
    });

    const totalReviews = reviews.length;

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      totalReviews;

    await ProviderProfile.findByIdAndUpdate(
      booking.provider,
      {
        averageRating: avgRating,
        totalReviews: totalReviews,
      }
    );

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};