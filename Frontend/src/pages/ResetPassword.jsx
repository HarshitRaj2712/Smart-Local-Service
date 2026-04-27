import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logic to check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await API.post(`/auth/reset-password/${token}`, {
        password: formData.password,
      });

      toast.success("Password updated successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) px-4 transition-colors duration-200">
      <div className="relative bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-6 md:p-8 rounded-[28px] shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300 text-(--text-main)">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-(--text-main) tracking-tight">New Password</h2>
          <p className="text-(--text-muted) text-xs mt-1">Please enter and confirm your new password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* New Password Input */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="compact-input"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="compact-input"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Update Password
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
          transition: all 0.2s;
          color: var(--text-main);
        }
        .compact-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
          background-color: var(--bg-surface);
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;