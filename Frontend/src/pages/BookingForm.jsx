import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const BookingForm = () => {
  const { id } = useParams(); // providerId
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    serviceDate: "",
    description: "",
    price: "",
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
          providerId: id, // ✅ VERY IMPORTANT
          ...formData,
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
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Book Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="serviceDate"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Describe your issue"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        {/* ✅ PRICE FIELD */}
        <input
          type="number"
          name="price"
          placeholder="Service price"
          onChange={handleChange}
          required
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