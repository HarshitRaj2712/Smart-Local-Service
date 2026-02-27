import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { 
  User, Mail, Calendar, Info, 
  Settings, LogOut, LayoutDashboard, 
  FileText, ShieldAlert, CheckCircle,
  Star, Trophy, Wallet, BellRing
} from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const resendVerification = async () => {
  try {
    await API.post(
      "/auth/resend-verification",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Verification email sent 📩");
  } catch {
    alert("Failed to send email");
  }
};

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const createdDate = new Date(user?.createdAt || Date.now());
  const today = new Date();
  const accountAge = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const fetchBookings = async () => {
    const { data } = await API.get("/booking/provider-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(data);
  };

  const fetchAnalytics = async () => {
    const { data } = await API.get("/provider/analytics", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(data);
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
      fetchAnalytics();
    }
  }, [token]);

  const updateStatus = async (id, status) => {
    await API.put(`/booking/update-status/${id}`, { status }, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    fetchBookings();
    fetchAnalytics();
  };

  if (!user) return null;

  const pieData = stats && {
    labels: ["Completed", "Cancelled"],
    datasets: [{
      data: [stats.completedBookings, stats.cancelledBookings],
      backgroundColor: ["#22c55e", "#ef4444"],
      borderWidth: 0,
    }],
  };

  const barData = stats && {
    labels: ["Completion", "Trust"],
    datasets: [{
      label: "Score %",
      data: [stats.completionRate, stats.trustScore],
      backgroundColor: ["#007FFF", "#8b5cf6"],
      borderRadius: 12,
    }],
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-16" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* ================= EMAIL VERIFY BANNER (Same as User) ================= */}
        {!user.isEmailVerified && (
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md border border-red-100 p-4 rounded-[22px] shadow-sm animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3 px-2">
              <ShieldAlert className="text-red-500" size={20} />
              <p className="text-sm font-semibold text-gray-700">
                Email not verified. Verify now!
              </p>
            </div>
            <button
                onClick={resendVerification}
                className="bg-[#007FFF] text-white text-[11px] font-bold px-5 py-2.5 rounded-full"
              >
                Verify Email
            </button>
          </div>
        )}

        {/* ================= WELCOME ================= */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
            Welcome, <span className="text-[#007FFF]">{user.name}</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Provider Control Panel</p>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white/90 backdrop-blur-2xl border border-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#007FFF] to-blue-300 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src={user.profilePic || "https://via.placeholder.com/120"}
                className="relative w-32 h-32 rounded-full object-cover border-[6px] border-white shadow-xl"
                alt="Provider"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{user.name}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm font-medium mt-1">
                <Mail size={16} className="text-[#007FFF]" /> <span>{user.email}</span>
              </div>
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="bg-blue-50 text-[#007FFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    Service Provider
                 </span>
                 <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
                    Joined {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="flex bg-white/50 backdrop-blur-md p-2 rounded-[24px] border border-white w-fit gap-2 mx-auto md:mx-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-8 py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "overview" ? "bg-[#007FFF] text-white shadow-lg shadow-[#007FFF]/30" : "text-gray-500 hover:bg-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-8 py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "bookings" ? "bg-[#007FFF] text-white shadow-lg shadow-[#007FFF]/30" : "text-gray-500 hover:bg-white"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => navigate("/provider/setup")}
            className="px-8 py-3 rounded-[18px] text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-white transition-all flex items-center gap-2"
          >
            <Settings size={14} /> Edit
          </button>
        </div>

        {/* ================= CONTENT TABS ================= */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard label="Total Bookings" value={stats.totalBookings} icon={<FileText size={20}/>} color="bg-blue-50 text-blue-600" />
              <StatCard label="Avg Rating" value={stats.averageRating?.toFixed(1)} icon={<Star size={20}/>} color="bg-yellow-50 text-yellow-600" isStar />
              <StatCard label="Trust Score" value={stats.trustScore?.toFixed(0)} icon={<Trophy size={20}/>} color="bg-purple-50 text-purple-600" />
              <StatCard label="Total Earnings" value={`₹${stats.totalEarnings}`} icon={<Wallet size={20}/>} color="bg-green-50 text-green-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[35px] border border-white shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-[#007FFF] rounded-full"></div> Booking Distribution
                </h3>
                <div className="max-w-[260px] mx-auto">
                  <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom', labels: { font: { family: 'Poppins', weight: '600', size: 11 } } } } }} />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[35px] border border-white shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-purple-500 rounded-full"></div> Performance Metrics
                </h3>
                <Bar data={barData} options={{ scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-800 px-2">Service Requests</h2>
            {bookings.length === 0 ? (
              <div className="bg-white/50 p-12 rounded-[35px] border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-400 font-bold">No current bookings</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white p-6 rounded-[30px] border border-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FFF0F5] rounded-2xl flex items-center justify-center text-[#007FFF] font-extrabold text-lg">
                        {booking.user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{booking.user.name}</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{new Date(booking.serviceDate).toDateString()}</p>
                      </div>
                    </div>
                    <div className="flex-1 px-4 text-center md:text-left">
                       <p className="text-sm text-gray-600 italic font-medium">"{booking.description}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-green-50 text-green-600 border border-green-100'
                      }`}>
                        {booking.status}
                      </span>
                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <button onClick={() => updateStatus(booking._id, "accepted")} className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"><CheckCircle size={18}/></button>
                          <button onClick={() => updateStatus(booking._id, "cancelled")} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={18}/></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ACCOUNT STATS (Updated Heading) ================= */}
        <div className="mt-16 pt-12 border-t border-white/50">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-8 px-2">Account Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Account Age */}
            <div className="bg-white/70 backdrop-blur-sm border border-white p-6 rounded-[32px] flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-blue-50 text-[#007FFF] rounded-[20px] shadow-sm">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.15em] leading-none mb-1">Account Age</p>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  {accountAge} Days
                </h3>
              </div>
            </div>

            {/* Role */}
            <div className="bg-white/70 backdrop-blur-sm border border-white p-6 rounded-[32px] flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-[20px] shadow-sm">
                <ShieldAlert size={22} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.15em] leading-none mb-1">User Role</p>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight capitalize">
                  {user.role}
                </h3>
              </div>
            </div>

            {/* Status (Updated with specific colors) */}
            <div className="bg-white/70 backdrop-blur-sm border border-white p-6 rounded-[32px] flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
              <div className="p-4 bg-orange-50 text-orange-500 rounded-[20px] shadow-sm">
                <CheckCircle size={22} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.15em] leading-none mb-1">Status</p>
                <h3 className={`text-xl font-extrabold tracking-tight ${
                  user.isEmailVerified ? "text-green-600" : "text-orange-500"
                }`}>
                  {user.isEmailVerified ? "Verified" : "Pending"}
                </h3>
              </div>
            </div>

          </div>

          {/* Logout Button */}
          <div className="flex justify-center md:justify-end mt-12">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 bg-white border border-red-100 text-red-500 px-10 py-4 rounded-full font-bold text-sm hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-100 active:scale-95"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---
const StatCard = ({ label, value, icon, color, isStar }) => (
  <div className="bg-white p-6 rounded-[32px] border border-white shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center gap-2 group">
    <div className={`p-4 rounded-[22px] ${color} mb-1 group-hover:scale-110 transition-transform`}>{icon}</div>
    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{label}</p>
    <h3 className={`text-2xl font-extrabold tracking-tight ${isStar ? 'text-yellow-500' : 'text-gray-900'}`}>{value}</h3>
  </div>
);

export default ProviderDashboard;