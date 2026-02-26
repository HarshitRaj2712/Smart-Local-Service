import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useRef, useEffect } from "react";
import { 
  Menu, X, LayoutDashboard, Settings, LogOut, 
  ShieldCheck, ChevronRight 
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Reduced height and absolute positioning to mimic the floating center look
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg border border-white/40 rounded-full shadow-lg shadow-black/5">
        <div className="px-6 py-2 flex items-center justify-between">
          
          {/* Left: Logo with Icon */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#007FFF] p-1.5 rounded-lg shadow-sm">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">LocalTrust</span>
            </Link>
          </div>

          {/* Center: Desktop Links (Small height font) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <Link to="/providers" className="hover:text-[#007FFF] transition-colors">Providers</Link>
            <a href="#how" className="hover:text-[#007FFF] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#007FFF] transition-colors">Features</a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            
            {/* Desktop Auth: Hidden on small screens */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-[#007FFF] px-3">Sign In</Link>
                <Link to="/signup" className="bg-gradient-to-r from-[#007FFF] to-[#00aaff] text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-md shadow-[#007FFF]/20 active:scale-95 transition-all">
                  Sign Up
                </Link>
              </div>
            ) : (
              /* Desktop Profile Dropdown */
              <div className="hidden sm:block relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <div className="w-7 h-7 rounded-full bg-[#007FFF] flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="font-bold text-gray-700 text-xs">{user?.name || "User"}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2">
                    <Link to={`/${role}`} className="flex items-center gap-3 p-2 text-gray-700 hover:bg-[#007FFF]/10 rounded-xl transition">
                      <LayoutDashboard size={16} /> <span className="text-xs font-semibold">Dashboard</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-50 rounded-xl transition">
                      <LogOut size={16} /> <span className="text-xs font-bold">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Icon Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} className="text-[#007FFF]" /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar (Inside the pill on mobile) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 p-6 space-y-6 animate-in slide-in-from-top duration-300">
            <div className="space-y-4">
              <Link to="/providers" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-base font-semibold text-gray-700">
                Providers <ChevronRight size={16} />
              </Link>
              <a href="#how" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-base font-semibold text-gray-700">
                How It Works <ChevronRight size={16} />
              </a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-base font-semibold text-gray-700">
                Features <ChevronRight size={16} />
              </a>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2.5 font-bold text-gray-700 border border-gray-100 rounded-full">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2.5 font-bold text-white bg-[#007FFF] rounded-full shadow-lg shadow-[#007FFF]/20">
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to={`/${role}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 font-semibold text-gray-700 bg-gray-50 rounded-2xl">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 font-semibold text-red-500 hover:bg-red-50 rounded-2xl">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;