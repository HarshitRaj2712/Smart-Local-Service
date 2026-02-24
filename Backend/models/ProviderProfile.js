import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    bio: String,
    idProof: String,
    portfolioImages: [String],

    isApproved: {
      type: Boolean,
      default: false,
    },

    // 🔥 ADD THESE FIELDS (IMPORTANT)

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    trustScore: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    completedBookings: {
      type: Number,
      default: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    platformCommissionGenerated: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ProviderProfile",
  providerProfileSchema
);