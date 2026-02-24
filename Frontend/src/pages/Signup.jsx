import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    gender: "",
    age: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await API.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    alert("Registered successfully 🎉");
    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  const handleGoogleSignup = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                profilePic: e.target.files[0],
              })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full mt-4 border py-2 rounded-lg"
        >
          Sign up with Google
        </button>

        <div className="my-4 text-center text-gray-400">
          OR
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="role"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;