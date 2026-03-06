import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";
import { LockKeyhole, X } from "lucide-react";

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
    <section className="bg-[#FFF0F5] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Box: Maintained Blue Theme */}
        <div className="bg-[#007FFF] rounded-xl shadow-lg px-6 py-12 md:py-16 text-center text-white relative overflow-hidden">

          {/* High-Visibility Corner Shapes: Increased opacity to 20% for a stronger look */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Main Heading - Original Text */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight relative z-10">
            Find Trusted Local Professionals <br />
            <span className="underline underline-offset-8 decoration-white/30">
              With Verified Trust Score
            </span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            {/* Button 1: White -> Blue with Sky Blue Border Hover */}
            <button onClick={handleBookService} className="bg-white text-[#007FFF] px-8 py-2.5 rounded-lg font-semibold border-2 border-transparent hover:bg-[#007FFF] hover:text-white hover:border-sky-300 transition-all duration-300">
              Book a Service
            </button>

            {/* Button 2: Border -> White Hover */}
            <button onClick={handleBecomeProvider} className="border-2 border-white text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-[#007FFF] transition-all duration-300">
              Become a Provider
            </button>


            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 animate-fadeIn">

                  <div className="relative bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 max-w-sm w-full text-center animate-scaleIn">

                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-4 right-4 text-gray-400"
                    >
                      <X size={18} />
                    </button>

                    <div className="flex justify-center mb-5">
                      <div className="p-4 rounded-full bg-blue-50 text-[#007FFF]">
                        <LockKeyhole size={28} />
                      </div>
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                      Login Required
                    </h2>

                    <p className="text-gray-500 text-sm mb-8">
                      Please login first to continue.
                    </p>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2 rounded-full border border-gray-200 text-gray-600"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 rounded-full bg-[#007FFF] text-white font-bold"
                      >
                        Login Now
                      </button>
                    </div>

                  </div>
                </div>
              )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;