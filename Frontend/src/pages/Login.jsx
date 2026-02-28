import { useState } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft, X } from "lucide-react";

const Login = () => {
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
      window.dispatchEvent(new Event("storage"));
      toast.success("Login successful");

      navigate("/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5] px-4">
      {/* Reduced padding (p-6) and max-width (max-w-md) to match the new compact style */}
      <div className="relative bg-white/75 backdrop-blur-xl border border-white/50 p-6 md:p-8 rounded-[28px] shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        
        <button onClick={() => navigate("/")} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 text-xs mt-1">Sign in to continue your LocalTrust experience</p>
        </div>

        {/* Compact Google Button */}
        <button
          type="button"
          onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm group"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
          <span className="text-xs font-bold text-gray-700">Sign in with Google</span>
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative px-3 text-[10px] font-bold text-gray-400 bg-transparent uppercase tracking-widest">Or continue with</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
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
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
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
            className="w-full bg-[#007FFF] hover:bg-[#0066CC] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#007FFF]/20 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-xs font-semibold text-gray-400 hover:text-[#007FFF] transition-colors"
          >
            Forgot your password?
          </button>

          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#007FFF] hover:underline">
              Create one
            </Link>
          </p>

          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-1.5 w-full text-[11px] font-bold text-gray-400 hover:text-gray-700 transition-colors pt-2"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
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
          transition: all 0.2s;
        }
        .compact-input:focus {
          border-color: #007FFF;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(0, 127, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;