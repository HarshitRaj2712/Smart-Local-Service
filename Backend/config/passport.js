import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:`${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        // If user doesn't exist → create
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: "google_oauth", // dummy
            role: "user",
            profilePic: profile.photos[0]?.value || "",
          });
        }

        // Generate JWT
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        done(null, { token });

      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;