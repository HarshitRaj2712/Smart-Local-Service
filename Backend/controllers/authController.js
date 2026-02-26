import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";


// 🔐 Generate JWT
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};




// ======================
// REGISTER
// ======================
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gender,
      age,
      phone,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔥 Upload profile picture (if exists)
    let profilePicUrl = "";

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });

    if (req.file) {
      profilePicUrl = await uploadToCloudinary(
        req.file.buffer
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      gender,
      age,
      phone,
      profilePic: profilePicUrl,
    });

    // 🔥 Auto-login after register
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });

    // Generate verification token
    const verifyToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const verifyUrl = `https://smart-local-service.vercel.app/verify-email/${verifyToken}`;  //changed for deployment

    await transporter.sendMail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// LOGIN
// ======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 2 * 60 * 1000; // 2 MINUTES

    await user.save();

    const resetUrl = `https://smart-local-service.vercel.app/reset-password/${resetToken}`;   //changed for deployment

    
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>This link expires in 2 minutes.</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.json({ message: "Reset link sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};