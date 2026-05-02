import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const MotionDiv = motion.div;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-(--bg-main) px-6 py-20 transition-colors duration-200 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          {/* Error Icon */}
          <MotionDiv
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="bg-(--bg-surface) p-6 rounded-full border border-(--border-color)">
              <AlertCircle size={64} className="text-[#FF6B6B]" />
            </div>
          </MotionDiv>

          {/* 404 Text */}
          <div>
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-7xl md:text-8xl font-bold text-(--text-main) mb-2">
                404
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#007FFF] to-[#0056CC] mx-auto mb-4 rounded-full"></div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-(--text-main) mb-2">
                Page Not Found
              </h2>
              <p className="text-lg text-(--text-muted) leading-relaxed max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
            </MotionDiv>
          </div>

          {/* Action Buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-(--bg-surface) hover:bg-[var(--bg-surface)] text-(--text-main) font-semibold rounded-lg border border-(--border-color) transition-all duration-200"
            >
              <Home size={20} />
              Go to Home
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#007FFF] hover:bg-[#0056CC] text-white font-semibold rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Go Back
            </motion.button>
          </MotionDiv>

          {/* Helpful Links */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 border-t border-(--border-color)"
          >
            <p className="text-(--text-muted) mb-4 text-sm">Helpful links:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "Providers", path: "/providers" },
                { label: "How It Works", path: "/how" },
                { label: "Features", path: "/features" },
                { label: "Help Center", path: "/help-center" },
              ].map((link) => (
                <motion.button
                  key={link.path}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(link.path)}
                  className="text-sm text-[#007FFF] hover:text-[#0056CC] font-medium transition-colors duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default NotFound;
