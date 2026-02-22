import ProviderProfile from "../models/ProviderProfile.js";
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
    const providers = await ProviderProfile.find({ isApproved: true })
      .populate("user", "name email");

    res.json(providers);
  } catch (error) {
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