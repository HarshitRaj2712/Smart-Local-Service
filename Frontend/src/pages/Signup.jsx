import { useState, useRef } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, Mail, Lock, Phone, Calendar, 
  UserCircle, Camera, ArrowLeft, X 
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    role: "user", gender: "", age: "",
    phone: "", profilePic: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      await API.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-(--bg-main) overflow-hidden transition-colors duration-200">
      <div className="min-h-full flex items-center justify-center px-4 py-6">
        {/* Keep card centered while allowing scroll on very small screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-10 md:mt-12 bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-6 rounded-[28px] shadow-xl w-full max-w-md text-(--text-main) transition-colors duration-200"
        >
        
        <button onClick={() => navigate("/")} className="absolute top-5 right-5 text-(--text-muted) hover:text-(--text-main)">
          <X size={18} />
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-(--text-main) tracking-tight">Create Account</h2>
          <p className="text-(--text-muted) text-xs mt-1">Join the LocalTrust community</p>
        </div>

        {/* Compact Google Button */}
        <button
          onClick={() => window.location.href = "https://smart-local-service.onrender.com/api/auth/google"}
          className="w-full flex items-center justify-center gap-2 bg-(--bg-surface) border border-(--border-color) py-2 rounded-lg hover:bg-(--bg-muted) transition-all mb-4"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
          <span className="text-xs font-bold text-(--text-main)">Sign up with Google</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Smaller Profile Upload */}
          <div className="flex justify-center mb-2">
            <div 
              className="relative w-16 h-16 rounded-full bg-(--bg-surface) border border-dashed border-(--border-color) flex items-center justify-center overflow-hidden cursor-pointer group"
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={28} className="text-(--text-muted)" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={14} className="text-white" />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="compact-input" required />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="compact-input" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" size={16} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="compact-input" required />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select name="gender" onChange={handleChange} className="compact-input px-3" required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select name="role" onChange={handleChange} className="compact-input px-3">
              <option value="user">User</option>
              <option value="provider">Provider</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input type="number" name="age" placeholder="Age" onChange={handleChange} className="compact-input px-3" />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="compact-input px-3" />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition-all mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-(--text-muted)">
            Already have an account? <Link to="/login" className="font-bold text-[var(--accent)]">Sign in</Link>
          </p>
          <button onClick={() => navigate("/")} className="text-xs font-bold text-(--text-muted) hover:text-(--text-main) mt-4 flex items-center justify-center gap-1 mx-auto">
            <ArrowLeft size={12} /> Back to Home
          </button>
        </div>
        </motion.div>
      </div>

      <style>{`
        .compact-input {
          width: 100%;
          padding: 0.6rem 0.75rem 0.6rem 2.5rem;
          border-radius: 0.6rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          font-size: 0.875rem;
          outline: none;
          color: var(--text-main);
        }
        .compact-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-soft);
        }
        select.compact-input { padding-left: 0.75rem; }
      `}</style>
    </div>
  );
};

export default Signup;