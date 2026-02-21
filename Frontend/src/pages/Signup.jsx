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
      await API.post("/auth/register", formData);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>

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