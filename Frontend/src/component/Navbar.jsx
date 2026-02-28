import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getUser } from "../utils/auth";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ renamed to avoid variable collision
  const [currentUser, setCurrentUser] = useState(getUser());

  const isAuthenticated = !!currentUser;
  const role = currentUser?.role;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ✅ Sync navbar instantly after login/logout
  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getUser());
    };

    window.addEventListener("storage", syncUser);

    return () =>
      window.removeEventListener("storage", syncUser);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // trigger navbar refresh
    window.dispatchEvent(new Event("storage"));

    toast.success("Logged out successfully!");
    setIsProfileOpen(false);
    navigate("/");
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg border border-white/40 rounded-full shadow-lg">

        <div className="px-6 py-2 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#007FFF] p-1.5 rounded-lg">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              LocalTrust
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
            <Link to="/providers">Providers</Link>
            <a href="#how">How It Works</a>
            <a href="#features">Features</a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold px-3"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="bg-[#007FFF] text-white px-5 py-1.5 rounded-full text-sm font-bold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() =>
                    setIsProfileOpen(!isProfileOpen)
                  }
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100"
                >
                  <div className="w-7 h-7 rounded-full bg-[#007FFF] flex items-center justify-center text-white text-xs font-bold">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>

                  <span className="font-bold text-xs">
                    {currentUser?.name || "User"}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl p-2">

                    <Link
                      to={`/${role}`}
                      className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-xl"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 p-6 space-y-6">

            <Link
              to="/providers"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between font-semibold"
            >
              Providers <ChevronRight size={16} />
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-center py-2 border rounded-full"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="text-center py-2 bg-[#007FFF] text-white rounded-full"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to={`/${role}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;