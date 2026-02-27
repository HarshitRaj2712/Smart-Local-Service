import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ get token ONLY from localStorage
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    serviceDate: "",
    description: "",
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
      await API.post(
        "/booking/create",
        {
          ...formData,
          providerId: id, // ⭐ VERY IMPORTANT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created successfully 🎉");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="serviceDate"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Describe your issue"
          required
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;