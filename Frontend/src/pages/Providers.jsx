import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { 
  Search, SlidersHorizontal, Star, 
  ShieldCheck, Briefcase, Award, 
  ChevronRight, Users 
} from "lucide-react";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("trust");
  const [minRating, setMinRating] = useState("");
  const [service, setService] = useState("");

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/provider/approved", {
        params: { sortBy, minRating, service },
      });
      setProviders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [sortBy, minRating, service]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto p-6 space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-3 pt-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Find <span className="text-[#007FFF]">Trusted</span> Providers
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Browse verified professionals with the highest trust scores in your community.
          </p>
        </div>

        {/* ================= FILTERS BAR ================= */}
        <div className="bg-white/70 backdrop-blur-xl border border-white p-5 rounded-[32px] shadow-xl shadow-gray-200/50 grid md:grid-cols-3 gap-6 items-end">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              <SlidersHorizontal size={12} /> Sort Results
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all cursor-pointer"
            >
              <option value="trust">Highest Trust Score</option>
              <option value="rating">Top Rated</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              <Star size={12} /> Min Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all cursor-pointer"
            >
              <option value="">All Ratings</option>
              <option value="4">4.0+ Stars</option>
              <option value="3">3.0+ Stars</option>
              <option value="2">2.0+ Stars</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              <Search size={12} /> Search Service
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Plumber, Tutor..."
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

        </div>

        {/* ================= PROVIDERS LIST ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <div className="w-12 h-12 border-4 border-[#007FFF] border-t-transparent rounded-full animate-spin"></div>
             <p className="font-bold text-gray-400 text-sm uppercase tracking-widest">Searching Professionals...</p>
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-[40px] border-2 border-dashed border-gray-200">
            <Users className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-600">No Providers Found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider, index) => (
              <Link key={provider._id} to={`/providers/${provider._id}`} className="group">
                <div className="relative bg-white border border-white p-6 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  
                  {/* Rank Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 text-white flex items-center justify-center rounded-2xl font-black text-xs shadow-lg group-hover:bg-[#007FFF] transition-colors">
                    #{index + 1}
                  </div>

                  {/* Profile Section */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-[#007FFF] to-blue-200 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
                      <img
                        src={
                          provider.user?.profilePic || // Try user profile pic
                          provider.idProof ||          // Fallback to idProof (where your image likely is)
                          "https://via.placeholder.com/100" // Final fallback
                        }
                        alt={provider.user?.name}
                        className="relative w-20 h-20 object-cover rounded-[24px] border-4 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                        {provider.user?.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[#007FFF] mt-1">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Pro</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3 mb-6">
                    <DetailPill icon={<Briefcase size={14} />} label="Service" value={provider.serviceType} />
                    <DetailPill icon={<Award size={14} />} label="Experience" value={`${provider.experience} Years`} />
                  </div>

                  {/* Scores Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                    <div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                        <Star size={16} fill="currentColor" />
                        <span className="text-lg font-black">{provider.averageRating?.toFixed(1) || "0.0"}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {provider.totalReviews || 0} Client Reviews
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-[#007FFF] text-lg font-black">
                        {provider.trustScore?.toFixed(0) || 0}%
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Trust Score
                      </p>
                    </div>
                  </div>

                  {/* Hover Button Overlay */}
                  <div className="mt-6 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] rounded-2xl group-hover:bg-[#007FFF] group-hover:text-white transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">View Profile</span>
                    <ChevronRight size={14} />
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* --- UI COMPONENTS --- */
const DetailPill = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-[#F8FAFC] px-4 py-3 rounded-[20px] group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-sm font-bold text-gray-800 capitalize">{value}</span>
  </div>
);

export default Providers;