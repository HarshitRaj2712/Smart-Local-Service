import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { 
  Star, 
  ShieldCheck, 
  Briefcase, 
  History, 
  ArrowLeft, 
  CalendarCheck, 
  LockKeyhole,
  Image as ImageIcon
} from "lucide-react";

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Token invalid");
      }
    }
  }, []);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const { data } = await API.get(`/provider/${id}`);
        setProvider(data);
      } catch (err) {
        console.error("Error fetching provider details");
      }
    };
    fetchProvider();
  }, [id]);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
        <div className="w-12 h-12 border-4 border-[#007FFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ================= NAVIGATION ================= */}
      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#007FFF] transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to list
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT COLUMN: INFO CARD ================= */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/90 backdrop-blur-2xl border border-white p-8 rounded-[40px] shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#007FFF] to-blue-300 rounded-full blur opacity-20"></div>
                <img
                  src={provider.user?.profilePic || provider.idProof || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full object-cover border-[6px] border-white shadow-xl mx-auto"
                />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {provider.user?.name}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-[#007FFF] mt-1 mb-4">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Expert</span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4 border-t border-gray-50 mt-4">
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                  <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold">
                    <Star size={14} fill="currentColor" />
                    {provider.averageRating?.toFixed(1) || "0.0"}
                  </div>
                </div>
                <div className="text-center border-l border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trust</p>
                  <p className="text-[#007FFF] font-bold">{provider.trustScore?.toFixed(0) || 0}%</p>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-6">
                {!role ? (
                  <button 
                    onClick={() => navigate("/login")}
                    className="w-full bg-gray-900 text-white py-4 rounded-[22px] font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200"
                  >
                    <LockKeyhole size={18} /> Login to Book
                  </button>
                ) : role === "user" ? (
                  <button
                    onClick={() => navigate(`/book/${provider._id}`)}
                    className="w-full bg-[#007FFF] text-white py-4 rounded-[22px] font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#007FFF]/30 transition-all active:scale-95"
                  >
                    <CalendarCheck size={18} /> Book Now
                  </button>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-2xl text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Providers cannot book services
                  </div>
                )}
              </div>
            </div>

            {/* EXPERIENCE PILL */}
            <div className="bg-white/60 border border-white p-6 rounded-[30px] space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-[#007FFF] rounded-2xl">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</p>
                  <p className="text-sm font-bold text-gray-800">{provider.serviceType}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Experience</p>
                  <p className="text-sm font-bold text-gray-800">{provider.experience} Years Professional</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BIO & PORTFOLIO ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* BIO CARD */}
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#007FFF] rounded-full"></div> 
                About {provider.user?.name.split(' ')[0]}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {provider.bio || "No bio provided by the professional."}
              </p>
            </div>

            {/* PORTFOLIO GALLERY */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ImageIcon size={20} className="text-[#007FFF]" />
                  Work Portfolio
                </h3>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {provider.portfolioImages?.length || 0} Projects
                </span>
              </div>

              {provider.portfolioImages?.length === 0 ? (
                <div className="bg-white/40 border-2 border-dashed border-gray-200 rounded-[40px] p-12 text-center text-gray-400 font-bold">
                  No portfolio images uploaded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {provider.portfolioImages.map((img, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-[30px] border-4 border-white shadow-sm hover:shadow-xl transition-all duration-500">
                      <img
                        src={img}
                        alt={`Work Sample ${index + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;