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
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5] px-4">
      <div className="relative bg-white/75 backdrop-blur-xl border border-white/50 p-6 md:p-8 rounded-[28px] shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-center mb-4">
          <div className="bg-[#007FFF]/10 p-3 rounded-full">
            <KeyRound className="text-[#007FFF]" size={32} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Forgot Password?</h2>
          <p className="text-gray-500 text-xs mt-1">No worries, we'll send you reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
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
            className="w-full bg-[#007FFF] hover:bg-[#0066CC] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#007FFF]/20 transition-all active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <button 
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-1.5 w-full text-[11px] font-bold text-gray-400 hover:text-gray-700 transition-colors pt-6"
        >
          <ArrowLeft size={14} /> Back to Login
        </button>
      </div>

      <style>{`
        .compact-input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.75rem;
          border-radius: 0.75rem;
          background-color: rgba(255, 255, 255, 0.6);
          border: 1px solid #f3f4f6;
          font-size: 0.875rem;
          outline: none;
        }
        .compact-input:focus {
          border-color: #007FFF;
          box-shadow: 0 0 0 3px rgba(0, 127, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;