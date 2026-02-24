import Booking from "../models/Booking.js";
import ProviderProfile from "../models/ProviderProfile.js";
import User from "../models/User.js";

export const getAdminAnalytics = async (req, res) => {
  try {

    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    const totalRevenue = await Booking.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const platformCommission = await ProviderProfile.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$platformCommissionGenerated" },
        },
      },
    ]);

    const totalProviders = await ProviderProfile.countDocuments();
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    res.json({
      totalBookings,
      completedBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalCommission: platformCommission[0]?.total || 0,
      totalProviders,
      totalUsers,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const formatted = revenue.map((item) => ({
      year: item._id.year,
      month: item._id.month,
      totalRevenue: item.totalRevenue,
    }));

    // Calculate Month-over-Month Growth
    for (let i = 1; i < formatted.length; i++) {
      const prev = formatted[i - 1].totalRevenue;
      const current = formatted[i].totalRevenue;

      if (prev === 0) {
        formatted[i].growth = 0;
      } else {
        formatted[i].growth = (
          ((current - prev) / prev) *
          100
        ).toFixed(1);
      }
    }

    // First month has no previous comparison
    if (formatted.length > 0) {
      formatted[0].growth = 0;
    }

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderLeaderboard = async (req, res) => {
  try {
    const topProviders = await ProviderProfile.find()
      .populate("user", "name email")
      .sort({ totalEarnings: -1 })
      .limit(10);

    const formatted = topProviders.map((provider, index) => ({
      rank: index + 1,
      name: provider.user?.name,
      email: provider.user?.email,
      totalEarnings: provider.totalEarnings,
      trustScore: provider.trustScore,
      completedBookings: provider.completedBookings,
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};