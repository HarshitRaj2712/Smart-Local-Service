import { useState } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const MotionDiv = motion.div;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE FULL USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      dispatch(loginSuccess(data.user));
      window.dispatchEvent(new Event("storage"));
      toast.success("Login successful");

      navigate("/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-(--bg-main) overflow-y-auto transition-colors duration-200">
      <div className="min-h-full flex items-center justify-center px-4 py-6">
        {/* Keep card centered while allowing scroll on very small screens */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-6 md:p-8 rounded-[28px] shadow-xl w-full max-w-md text-(--text-main) transition-colors duration-200"
        >
        
        <button onClick={() => navigate("/")} className="absolute top-5 right-5 text-(--text-muted) hover:text-(--text-main) transition-colors">
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-(--text-main) tracking-tight">Welcome Back</h2>
          <p className="text-(--text-muted) text-xs mt-1">Sign in to continue your LocalTrust experience</p>
        </div>

        {/* Compact Google Button */}
        <button
          type="button"
          onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)}
          className="w-full flex items-center justify-center gap-2 bg-(--bg-surface) border border-(--border-color) py-2.5 rounded-xl hover:bg-(--bg-muted) transition-all shadow-sm group"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
          <span className="text-xs font-bold text-(--text-main)">Sign in with Google</span>
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-(--border-color)"></div></div>
          <span className="relative px-3 text-[10px] font-bold text-(--text-muted) bg-transparent uppercase tracking-widest">Or continue with</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="compact-input"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="compact-input"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-xs font-semibold text-(--text-muted) hover:text-[var(--accent)] transition-colors"
          >
            Forgot your password?
          </button>

          <p className="text-xs text-(--text-muted)">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[var(--accent)] hover:underline">
              Create one
            </Link>
          </p>

          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-1.5 w-full text-[11px] font-bold text-(--text-muted) hover:text-(--text-main) transition-colors pt-2"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
        </MotionDiv>
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
          background-color: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
      `}</style>
    </div>
  );
};

export default Login;