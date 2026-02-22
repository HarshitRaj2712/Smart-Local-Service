import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import ProviderProfile from "../models/ProviderProfile.js";
// Create booking
export const createBooking = async (req, res) => {
  console.log("Booking route reached");
  try {
    const { providerId, serviceDate, description } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      provider: providerId,
      serviceDate,
      description,
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for user
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

// Get bookings for provider
export const getProviderBookings = async (req, res) => {
  try {
    // Find provider profile of logged-in provider
    const providerProfile = await ProviderProfile.findOne({
      user: req.user._id,
    });

    if (!providerProfile) {
      return res.status(404).json({ message: "Provider profile not found" });
    }

    const bookings = await Booking.find({
      provider: providerProfile._id,
    }).populate("user", "name email");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking updated successfully", booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};