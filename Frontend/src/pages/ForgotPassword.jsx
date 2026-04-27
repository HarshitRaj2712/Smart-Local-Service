import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to email (valid for 2 minutes)");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) px-4 transition-colors duration-200">
      <div className="relative bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-6 md:p-8 rounded-[28px] shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300 text-(--text-main)">
        
        <div className="flex justify-center mb-4">
          <div className="bg-[var(--accent-soft)] p-3 rounded-full">
            <KeyRound className="text-[var(--accent)]" size={32} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-(--text-main) tracking-tight">Forgot Password?</h2>
          <p className="text-(--text-muted) text-xs mt-1">No worries, we'll send you reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="compact-input"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <button 
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-1.5 w-full text-[11px] font-bold text-(--text-muted) hover:text-(--text-main) transition-colors pt-6"
        >
          <ArrowLeft size={14} /> Back to Login
        </button>
      </div>

      <style>{`
        .compact-input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.75rem;
          border-radius: 0.75rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          font-size: 0.875rem;
          outline: none;
          color: var(--text-main);
        }
        .compact-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;