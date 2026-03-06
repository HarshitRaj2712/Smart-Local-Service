import { X, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 animate-fadeIn">

      <div className="relative bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 max-w-sm w-full text-center animate-scaleIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-blue-50 text-[#007FFF]">
            <LockKeyhole size={28} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Login Required
        </h2>

        <p className="text-gray-500 text-sm mb-8">
          Please login first to access this feature.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full bg-[#007FFF] text-white font-bold shadow-lg hover:shadow-[#007FFF]/30 transition"
          >
            Login Now
          </button>

        </div>

      </div>
    </div>
  );
};

export default LoginRequiredModal;