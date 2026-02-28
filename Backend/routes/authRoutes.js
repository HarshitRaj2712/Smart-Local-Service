import express from "express";
import passport from "passport";
import upload from "../middleware/uploadMiddleware.js";
import { getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail
} from "../controllers/authController.js";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Normal Auth
router.post(
  "/register",
  upload.single("profilePic"),
  registerUser
);

router.get("/me", protect, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);


router.post("/login", loginUser);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://smart-local-service.vercel.app/login",  //changed for deployment
  }),
  (req, res) => {
    res.redirect(
      `https://smart-local-service.vercel.app/oauth-success?token=${req.user.token}`  //changed for deployment
    );
  }
);
router.post(
  "/resend-verification",
  protect,
  resendVerificationEmail
);

export default router;