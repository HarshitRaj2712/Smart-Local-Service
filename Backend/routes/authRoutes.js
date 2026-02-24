import express from "express";
import passport from "passport";
import upload from "../middleware/uploadMiddleware.js";
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
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect(
      `http://localhost:5173/oauth-success?token=${req.user.token}`
    );
  }
);

export default router;