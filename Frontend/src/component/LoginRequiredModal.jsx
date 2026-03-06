import { X, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <LogIn className="text-[#007FFF]" size={40} />
        </div>

        <h2 className="text-xl font-bold mb-2">
          Login Required
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Please login first to access this feature.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#007FFF] text-white px-6 py-2 rounded-full font-bold"
        >
          Go to Login
        </button>

      </div>
    </div>
  );
};

export default LoginRequiredModal;