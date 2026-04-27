import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getUser } from "../utils/auth";
import API from "../api/axios";
import { getSocket, disconnectSocket } from "../utils/socket";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Bell,
  MessageCircle,
  ShieldCheck,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getUser());
  const isAuthenticated = !!currentUser;
  const role = currentUser?.role;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "dark";
  });

  const profileRef = useRef(null);

  const applyTheme = (nextTheme) => {
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getUser());
    };

    const syncTheme = () => {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isAuthenticated) return;

    const fetchNotifications = async () => {
      try {
        const { data } = await API.get("/notification/my-notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUnreadCount(data.unreadCount || 0);
      } catch {
        // Keep navbar non-blocking if notifications fail.
      }
    };

    fetchNotifications();

    const socket = getSocket(token);
    if (!socket) return;

    const handleNewNotification = () => {
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    disconnectSocket();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logged out successfully!");
    setIsProfileOpen(false);
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="max-w-5xl mx-auto relative">
        <div className="bg-(--nav-bg) backdrop-blur-lg border border-(--border-color) rounded-full shadow-lg transition-colors duration-200">
          <div className="px-6 py-2 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#007FFF] p-1.5 rounded-lg">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-(--text-main)">LocalTrust</span>
            </Link>

            <div className="hidden md:flex gap-6 text-sm font-semibold text-(--text-muted)">
              <Link to="/providers">Providers</Link>
              <Link to="/how">How It Works</Link>
              <Link to="/features">Features</Link>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-1 rounded-full border border-(--border-color) bg-(--bg-surface) px-2 py-1 text-(--text-muted) hover:bg-(--bg-muted) transition-colors"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="text-sm font-bold px-3 text-(--text-main)">
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
                  <>
                    <button
                      onClick={() => navigate("/chats")}
                      className="relative p-2 rounded-full hover:bg-(--bg-muted) text-(--text-main) transition-colors"
                      aria-label="Chats"
                    >
                      <MessageCircle size={18} />
                    </button>

                    <button
                      onClick={() => navigate("/notifications")}
                      className="relative p-2 rounded-full hover:bg-(--bg-muted) text-(--text-main) transition-colors"
                      aria-label="Notifications"
                    >
                      <Bell size={18} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>

                    <div className="relative" ref={profileRef}>
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-(--bg-muted) transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#007FFF] flex items-center justify-center text-white text-xs font-bold">
                          {currentUser?.name?.charAt(0) || "U"}
                        </div>

                        <span className="font-bold text-xs text-(--text-main)">
                          {currentUser?.name || "User"}
                        </span>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-(--bg-surface) rounded-2xl shadow-xl p-2 border border-(--border-color)">
                          <Link
                            to={`/${role}`}
                            className="flex items-center gap-3 p-2 hover:bg-(--bg-muted) rounded-xl text-(--text-main)"
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
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="md:hidden p-2 rounded-full hover:bg-(--bg-muted) text-(--text-main) transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </button>

              <button
                className="md:hidden p-2 rounded-full hover:bg-(--bg-muted) text-(--text-main) transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 bg-(--bg-panel) backdrop-blur-lg border border-(--border-color) rounded-3xl shadow-lg p-6 space-y-5 text-(--text-main) transition-colors duration-200">
            <Link
              to="/providers"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between font-semibold text-(--text-muted)"
            >
              Providers <ChevronRight size={16} />
            </Link>

            <Link
              to="/how"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between font-semibold text-(--text-muted)"
            >
              How It Works <ChevronRight size={16} />
            </Link>

            <Link
              to="/features"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between font-semibold text-(--text-muted)"
            >
              Features <ChevronRight size={16} />
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-center py-2 border rounded-full border-(--border-color) text-(--text-main)"
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
                  to="/chats"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 font-semibold text-(--text-muted)"
                >
                  <MessageCircle size={18} />
                  Chats
                </Link>

                <Link
                  to="/notifications"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between font-semibold text-(--text-muted)"
                >
                  <span className="flex items-center gap-2">
                    <Bell size={18} />
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>

                <Link
                  to={`/${role}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-(--text-muted)"
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
