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

    bio: {
      type: String,
    },

    idProof: {
      type: String,
    },

    portfolioImages: [
      {
        type: String,
      },
    ],

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProviderProfile", providerProfileSchema);