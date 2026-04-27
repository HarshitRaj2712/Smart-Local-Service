import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";
import { LockKeyhole, X } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);

  const handleBookService = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
    } else {
      navigate("/providers");
    }
  };

  const handleBecomeProvider = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
    } else {
      navigate("/provider/setup");
    }
  };
  return (
    <section className="bg-(--bg-main) py-10 px-4 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Box: Maintained Blue Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[var(--accent)] rounded-xl shadow-lg px-6 py-12 md:py-16 text-center text-white relative overflow-hidden transition-colors duration-200"
        >

          {/* High-Visibility Corner Shapes: Increased opacity to 20% for a stronger look */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full -translate-y-16 translate-x-16"
          ></motion.div>
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full translate-y-12 -translate-x-12"
          ></motion.div>

          {/* Main Heading - Original Text */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-bold leading-tight relative z-10"
          >
            Find Trusted Local Professionals <br />
            <span className="underline underline-offset-8 decoration-white/30">
              With Verified Trust Score
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4 relative z-10"
          >
            {/* Button 1: White -> Blue with Sky Blue Border Hover */}
            <button onClick={handleBookService} className="bg-white text-[var(--accent)] px-8 py-2.5 rounded-lg font-semibold border-2 border-transparent hover:bg-[var(--accent-hover)] hover:text-white hover:border-[color:var(--accent-soft)] transition-all duration-300">
              Book a Service
            </button>

            {/* Button 2: Border -> White Hover */}
            <button onClick={handleBecomeProvider} className="border-2 border-white text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-[var(--accent)] transition-all duration-300">
              Become a Provider
            </button>


            <LoginRequiredModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;