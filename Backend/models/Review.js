import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderProfile",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    averageRating: {
    type: Number,
    default: 0,
    },

    totalReviews: {
    type: Number,
    default: 0,
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);