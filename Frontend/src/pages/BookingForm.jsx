import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { 
  Calendar, 
  FileText, 
  IndianRupee, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";

const BookingForm = () => {
  const { id } = useParams(); // providerId
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    serviceDate: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/booking/create",
        {
          providerId: id,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created successfully 🎉");
      navigate("/dashboard"); // Redirecting to user dashboard to see status
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] p-6 flex items-center justify-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-4xl w-full grid md:grid-cols-5 gap-8">
        
        {/* ================= LEFT SIDE: INFO ================= */}
        <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#007FFF] transition-colors w-fit mb-4"
          >
            <ArrowLeft size={18} /> Cancel Booking
          </button>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Finalize Your <span className="text-[#007FFF]">Booking</span>
            </h2>
            <p className="text-gray-500 font-medium">
              Fill in the details to send a service request. The provider will review and accept your appointment shortly.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[32px] border border-white space-y-4">
            <div className="flex items-center gap-3 text-[#007FFF]">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Safe & Secure Payment</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed">
              * Note: The final price may vary based on the actual work required after the provider inspects the task.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE: FORM ================= */}
        <div className="md:col-span-3 bg-white/90 backdrop-blur-2xl border border-white p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-right duration-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* DATE FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <Calendar size={14} /> Preferred Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                onChange={handleChange}
                required
                className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
              />
            </div>

            {/* DESCRIPTION FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <FileText size={14} /> Task Description
              </label>
              <textarea
                name="description"
                placeholder="Explain the issue (e.g., Leaking kitchen tap, switch board sparking...)"
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-[#F8FAFC] border-none text-sm font-bold p-4 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all resize-none"
              />
            </div>

            {/* PRICE FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                <IndianRupee size={14} /> Offered Price (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F8FAFC] border-none text-sm font-black p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-[#007FFF] transition-all"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  ₹
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="group w-full bg-[#007FFF] text-white py-5 rounded-[22px] font-extrabold text-sm uppercase tracking-widest shadow-xl shadow-[#007FFF]/30 hover:shadow-[#007FFF]/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mt-4"
            >
              Send Booking Request
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              By confirming, you agree to the LocalTrust service terms.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default BookingForm;