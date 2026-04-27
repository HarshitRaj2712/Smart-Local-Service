import { X, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 animate-fadeIn">

      <div className="relative bg-(--bg-surface) backdrop-blur-xl border border-(--border-color) shadow-2xl rounded-3xl p-10 max-w-sm w-full text-center animate-scaleIn text-(--text-main)">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-(--text-muted) hover:text-(--text-main)"
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-(--bg-muted) text-[var(--accent)]">
            <LockKeyhole size={28} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-extrabold text-(--text-main) mb-2">
          Login Required
        </h2>

        <p className="text-(--text-muted) text-sm mb-8">
          Please login first to access this feature.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-(--border-color) text-(--text-muted) font-semibold hover:bg-(--bg-muted) transition"
          >
            Cancel
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full bg-[var(--accent)] text-white font-bold shadow-lg hover:bg-[var(--accent-hover)] transition"
          >
            Login Now
          </button>

        </div>

      </div>
    </div>
  );
};

export default LoginRequiredModal;