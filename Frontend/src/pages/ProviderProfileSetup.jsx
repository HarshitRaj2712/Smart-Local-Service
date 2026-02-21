import { useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const ProviderProfileSetup = () => {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    serviceType: "",
    experience: "",
    bio: "",
  });

  const [idProof, setIdProof] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("serviceType", formData.serviceType);
    data.append("experience", formData.experience);
    data.append("bio", formData.bio);

    if (idProof) {
      data.append("idProof", idProof);
    }

    for (let i = 0; i < portfolio.length; i++) {
      data.append("portfolio", portfolio[i]);
    }

    try {
      await API.post("/provider/create-profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile created successfully 🎉");

    } catch (error) {
      alert(error.response?.data?.message || "Error creating profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center">
          Setup Provider Profile
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="serviceType"
            placeholder="Service Type (Electrician, Plumber...)"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <div>
            <label className="block mb-1 font-medium">Upload ID Proof</label>
            <input
              type="file"
              onChange={(e) => setIdProof(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Upload Portfolio Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setPortfolio(e.target.files)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProviderProfileSetup;