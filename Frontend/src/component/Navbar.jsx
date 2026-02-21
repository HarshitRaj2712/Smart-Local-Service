import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LocalTrust
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/providers" className="hover:text-blue-600 transition">
            Providers
          </Link>

          <a href="#how">How It Works</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Auth Section */}
        <div className="flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-700 font-medium">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/${role}`}
                className="text-gray-700 font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;