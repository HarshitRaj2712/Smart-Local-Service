import ProviderProfile from "../models/ProviderProfile.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import cloudinary from "../config/cloudinary.js";

export const createProviderProfile = async (req, res) => {
  try {
    const { serviceType, experience, bio } = req.body;

    const idProofFile = req.files.idProof?.[0];
    const portfolioFiles = req.files.portfolio || [];

    // Upload ID proof
    let idProofUrl = "";
    if (idProofFile) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "provider_id_proofs" },
        (error, result) => result
      );
    }

    // Instead of upload_stream complexity,
    // simpler approach:

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "provider_uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });

    let idProofUrlFinal = "";
    if (idProofFile) {
      idProofUrlFinal = await uploadToCloudinary(idProofFile.buffer);
    }

    const portfolioUrls = [];

    for (let file of portfolioFiles) {
      const url = await uploadToCloudinary(file.buffer);
      portfolioUrls.push(url);
    }

    // Never create duplicate profiles for the same provider.
    const existingProfile = await ProviderProfile.findOne({ user: req.user._id });

    if (existingProfile) {
      existingProfile.serviceType = serviceType;
      existingProfile.experience = experience;
      existingProfile.bio = bio;

      if (idProofUrlFinal) {
        existingProfile.idProof = idProofUrlFinal;
      }

      if (portfolioUrls.length > 0) {
        existingProfile.portfolioImages = portfolioUrls;
      }

      const updatedProfile = await existingProfile.save();
      return res.json(updatedProfile);
    }

    const profile = await ProviderProfile.create({
      user: req.user._id,
      serviceType,
      experience,
      bio,
      idProof: idProofUrlFinal,
      portfolioImages: portfolioUrls,
    });

    res.status(201).json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    const { serviceType, experience, bio } = req.body;

    const idProofFile = req.files?.idProof?.[0];
    const portfolioFiles = req.files?.portfolio || [];

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "provider_uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });

    // Upload new ID proof if provided
    let idProofUpdate = {};
    if (idProofFile) {
      const idProofUrlFinal = await uploadToCloudinary(idProofFile.buffer);
      idProofUpdate = { idProof: idProofUrlFinal };
    }

    // Upload new portfolio images if provided
    let portfolioUpdate = {};
    if (portfolioFiles.length > 0) {
      const portfolioUrls = [];
      for (let file of portfolioFiles) {
        const url = await uploadToCloudinary(file.buffer);
        portfolioUrls.push(url);
      }
      portfolioUpdate = { portfolioImages: portfolioUrls };
    }

    // Find existing profile for current user and update it
    const profile = await ProviderProfile.findOneAndUpdate(
      { user: req.user._id }, // Find condition
      {
        serviceType,
        experience,
        bio,
        ...idProofUpdate,
        ...portfolioUpdate,
      },
      { new: true, runValidators: true } // Return updated doc
    );

    if (!profile) {
      return res.status(404).json({ message: "Provider profile not found" });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.user._id,
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderProfile.find()
      .populate("user", "name email");

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await ProviderProfile.findById(id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    provider.isApproved = true;
    await provider.save();

    res.json({ message: "Provider approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedProviders = async (req, res) => {
  try {
    const { sortBy, minRating, service } = req.query;

    let filter = { isApproved: true };

    if (minRating && !isNaN(minRating)) {
      filter.averageRating = { $gte: Number(minRating) };
    }

    if (service && service.trim() !== "") {
      filter.serviceType = {
        $regex: service,
        $options: "i",
      };
    }

    let query = ProviderProfile.find(filter)
      .populate("user", "name email"); // VERY IMPORTANT

    if (sortBy === "trust") {
      query = query.sort({ trustScore: -1 });
    } else if (sortBy === "rating") {
      query = query.sort({ averageRating: -1 });
    }

    const providers = await query;

    res.json(providers);

  } catch (error) {
    console.error("Approved Provider Error:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getProviderById = async (req, res) => {
  try {
    const provider = await ProviderProfile.findById(req.params.id)
      .populate("user", "name email");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(provider);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderAnalytics = async (req, res) => {
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
    });

    const totalBookings = bookings.length;

    const completedBookings = bookings.filter(
      (b) => b.status === "completed"
    ).length;

    const cancelledBookings = bookings.filter(
      (b) => b.status === "cancelled"
    ).length;

    const completionRate =
      totalBookings > 0
        ? ((completedBookings / totalBookings) * 100).toFixed(1)
        : 0;

    res.json({
      totalBookings,
      completedBookings,
      cancelledBookings,
      completionRate,
      averageRating: providerProfile.averageRating,
      trustScore: providerProfile.trustScore,
      totalEarnings: providerProfile.totalEarnings,
      platformCommissionGenerated:
      providerProfile.platformCommissionGenerated,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};