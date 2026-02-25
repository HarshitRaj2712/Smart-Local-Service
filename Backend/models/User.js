import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    
    gender: {
      type: String,
      // required: true,
    },

    age: {
      type: Number,
      // required: true,
    },

    phone: {
      type: String,
      required: false,
    },

    profilePic: {
    type: String,
    default: "",
  },

    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isEmailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationToken: String,
  emailVerificationExpire: Date,

  resetPasswordToken: String,
  resetPasswordExpire: Date,
    },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);