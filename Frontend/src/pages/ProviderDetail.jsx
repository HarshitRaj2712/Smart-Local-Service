import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode";

import {
  Star,
  ShieldCheck,
  Briefcase,
  History,
  ArrowLeft,
  CalendarCheck,
  LockKeyhole,
  Image as ImageIcon,
  X
} from "lucide-react";

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [role, setRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBook = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
    } else {
      navigate(`/book/${provider._id}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const { data } = await API.get(`/provider/${id}`);
        setProvider(data);
      } catch {
        console.error("Error fetching provider");
      }
    };

    fetchProvider();
  }, [id]);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
        <div className="w-12 h-12 border-4 border-[#007FFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-20">

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X size={18} />
            </button>

            <LockKeyhole className="mx-auto mb-4 text-[#007FFF]" size={40} />

            <h2 className="text-xl font-bold mb-2">
              Login Required
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Please login first to book this provider.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-[#007FFF] text-white px-6 py-2 rounded-full font-bold"
            >
              Go to Login
            </button>

          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#007FFF] mb-6"
        >
          <ArrowLeft size={18} />
          Back to list
        </button>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CARD */}
          <div className="bg-white p-8 rounded-3xl text-center shadow-sm">

            <img
              src={
                provider.user?.profilePic ||
                provider.idProof ||
                "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />

            <h2 className="text-2xl font-bold">
              {provider.user?.name}
            </h2>

            <div className="flex items-center justify-center gap-1 text-[#007FFF] mt-1">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold">
                Verified Expert
              </span>
            </div>

            <div className="grid grid-cols-2 mt-6 border-t pt-4">

              <div>
                <p className="text-xs text-gray-400">Rating</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold">
                  <Star size={14} fill="currentColor" />
                  {provider.averageRating?.toFixed(1) || "0.0"}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">Trust</p>
                <p className="text-[#007FFF] font-bold">
                  {provider.trustScore?.toFixed(0) || 0}%
                </p>
              </div>

            </div>

            {/* BOOK BUTTON */}
            <div className="mt-6">

              {!role ? (
                <button
                  onClick={handleBook}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <LockKeyhole size={18} />
                  Login to Book
                </button>
              ) : role === "user" ? (
                <button
                  onClick={handleBook}
                  className="w-full bg-[#007FFF] text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <CalendarCheck size={18} />
                  Book Now
                </button>
              ) : (
                <div className="p-3 text-gray-400 text-sm">
                  Providers cannot book services
                </div>
              )}

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* BIO */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">
                About {provider.user?.name}
              </h3>

              <p className="text-gray-600">
                {provider.bio || "No bio provided"}
              </p>
            </div>

            {/* PORTFOLIO */}
            <div>

              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ImageIcon size={20} />
                Work Portfolio
              </h3>

              {provider.portfolioImages?.length === 0 ? (
                <div className="border-dashed border-2 p-10 text-center text-gray-400 rounded-3xl">
                  No portfolio images
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {provider.portfolioImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="work"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;