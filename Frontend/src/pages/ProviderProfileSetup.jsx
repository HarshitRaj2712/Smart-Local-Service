import { useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";
import { 
  Briefcase, 
  History, 
  FileText, 
  UploadCloud, 
  Image as ImageIcon, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
const ProviderProfileSetup = () => {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    serviceType: "",
    experience: "",
    bio: "",
  });

  const [idProof, setIdProof] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [previews, setPreviews] = useState({ id: null, portfolio: [] });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (type === "id") {
      setIdProof(files[0]);
      setPreviews((prev) => ({ ...prev, id: URL.createObjectURL(files[0]) }));
    } else {
      setPortfolio(files);
      const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews((prev) => ({ ...prev, portfolio: fileArray }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("serviceType", formData.serviceType);
    data.append("experience", formData.experience);
    data.append("bio", formData.bio);

    if (idProof) data.append("idProof", idProof);
    for (let i = 0; i < portfolio.length; i++) {
      data.append("portfolio", portfolio[i]);
    }

    try {
      await API.post("/provider/create-profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile created successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex justify-center items-center p-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="bg-white/90 backdrop-blur-2xl border border-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Setup <span className="text-[#007FFF]">Professional</span> Profile
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Build your trust with customers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Service & Experience Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <Briefcase size={12} /> Service Type
              </label>
              <input
                type="text"
                name="serviceType"
                placeholder="Electrician, Plumber..."
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <History size={12} /> Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                placeholder="Ex: 5"
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              <FileText size={12} /> Short Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell customers why they should trust your work..."
              onChange={handleChange}
              rows="3"
              className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
            />
          </div>

          {/* Uploads Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* ID Proof */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <UploadCloud size={12} /> ID Proof
              </label>
              <label className="group relative flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-[30px] hover:border-[#007FFF] hover:bg-blue-50/50 transition-all cursor-pointer overflow-hidden">
                {previews.id ? (
                  <img src={previews.id} className="w-full h-full object-cover" alt="ID Preview" />
                ) : (
                  <div className="text-center space-y-2">
                    <UploadCloud className="mx-auto text-gray-300 group-hover:text-[#007FFF]" />
                    <p className="text-[11px] font-bold text-gray-400">Click to upload</p>
                  </div>
                )}
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "id")} />
              </label>
            </div>

            {/* Portfolio */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <ImageIcon size={12} /> Portfolio Images
              </label>
              <label className="group relative flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-[30px] hover:border-[#007FFF] hover:bg-blue-50/50 transition-all cursor-pointer overflow-hidden">
                {previews.portfolio.length > 0 ? (
                  <div className="grid grid-cols-2 w-full h-full">
                    {previews.portfolio.slice(0, 4).map((src, i) => (
                      <img key={i} src={src} className="w-full h-full object-cover border-[1px] border-white" alt="Portfolio" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="mx-auto text-gray-300 group-hover:text-[#007FFF]" />
                    <p className="text-[11px] font-bold text-gray-400">Upload work samples</p>
                  </div>
                )}
                <input type="file" multiple className="hidden" onChange={(e) => handleFileChange(e, "portfolio")} />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group w-full bg-[#007FFF] text-white py-5 rounded-[22px] font-extrabold text-sm uppercase tracking-widest shadow-xl shadow-[#007FFF]/30 hover:shadow-[#007FFF]/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            Create My Profile
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProviderProfileSetup;