import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

/* ============================
   JWT TOKEN
============================ */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ============================
   REGISTER USER
============================ */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, gender, age, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    /* ---------- HASH PASSWORD ---------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------- CLOUDINARY UPLOAD ---------- */
    let profilePicUrl = "";

    if (req.file) {
      profilePicUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    /* ---------- CREATE USER ---------- */
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

    /* =================================
       ✅ GENERATE EMAIL VERIFY TOKEN FIRST
    ================================= */
    const verifyToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    /* ---------- SEND EMAIL ---------- */
    const verifyUrl =
      `https://smart-local-service.vercel.app/verify-email/${verifyToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `,
    });

    /* ---------- RESPONSE LAST ---------- */
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        age: user.age,
        createdAt: user.createdAt,
        isEmailVerified: user.isEmailVerified,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   LOGIN
============================ */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        age: user.age,
        createdAt: user.createdAt,
        isEmailVerified: user.isEmailVerified,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   VERIFY EMAIL
============================ */
export const verifyEmail = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        message: "Invalid or expired token",
      });

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   RESEND VERIFICATION
============================ */
export const resendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.isEmailVerified)
      return res.json({ message: "Already verified" });

    const verifyToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const verifyUrl =
      `https://smart-local-service.vercel.app/verify-email/${verifyToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `,
    });

    res.json({ message: "Verification email sent" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   FORGOT PASSWORD
============================ */
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 2 * 60 * 1000;

    await user.save();

    const resetUrl =
      `https://smart-local-service.vercel.app/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>
        <p>Expires in 2 minutes</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.json({ message: "Reset link sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   RESET PASSWORD
============================ */
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token expired" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET LOGGED USER
============================ */
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};