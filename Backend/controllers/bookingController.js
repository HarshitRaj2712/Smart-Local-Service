import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import ProviderProfile from "../models/ProviderProfile.js";


// ==========================
// Create Booking
// ==========================
export const createBooking = async (req, res) => {
  try {
    const { providerId, serviceDate, description, price } = req.body;

    if (!price || price <= 0) {
      return res.status(400).json({
        message: "Valid price is required",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      provider: providerId,
      serviceDate,
      description,
      price,
      status: "pending",
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================
// Get User Bookings
// ==========================
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("provider")
      .sort({ createdAt: -1 });

    const bookingsWithReviewStatus = await Promise.all(
      bookings.map(async (booking) => {
        const review = await Review.findOne({
          booking: booking._id,
        });

        return {
          ...booking.toObject(),
          isReviewed: !!review,
        };
      })
    );

    res.json(bookingsWithReviewStatus);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================
// Get Provider Bookings
// ==========================
export const getProviderBookings = async (req, res) => {
  try {
    const providerProfile = await ProviderProfile.findOne({
      user: req.user._id,
    });

    if (!providerProfile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const bookings = await Booking.find({
      provider: providerProfile._id,
    }).populate("user", "name email");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================
// Update Booking Status
// ==========================
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const oldStatus = booking.status;

    booking.status = status;
    await booking.save();

    const provider = await ProviderProfile.findById(booking.provider);

    // Count booking when accepted first time
    if (status === "accepted" && oldStatus !== "accepted") {
      provider.totalBookings += 1;
    }

    // When completed (only once)
    if (status === "completed" && oldStatus !== "completed") {
      provider.completedBookings += 1;

      // Revenue Logic
      const commissionRate = 0.1; // 10%

      const platformCommission = booking.price * commissionRate;
      const providerEarning = booking.price - platformCommission;

      provider.totalEarnings += providerEarning;
      provider.platformCommissionGenerated += platformCommission;
    }

    // ----------------------------
    // Recalculate Trust Score
    // ----------------------------

    const completionRate =
      provider.totalBookings > 0
        ? provider.completedBookings / provider.totalBookings
        : 0;

    const ratingScore = provider.averageRating * 20;

    provider.trustScore =
      ratingScore * 0.6 +
      completionRate * 100 * 0.4;

    await provider.save();

    res.json({
      message: "Booking updated successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};