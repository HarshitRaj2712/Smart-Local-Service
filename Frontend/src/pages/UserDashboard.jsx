import { useNavigate } from "react-router-dom";
import { 
  User, Mail, Calendar, Info, 
  Settings, LogOut, LayoutDashboard, 
  FileText, ShieldAlert, CheckCircle 
} from "lucide-react";
import toast from "react-hot-toast";
const UserDashboard = () => {
  const navigate = useNavigate();

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

    toast.success("Verification email sent 📩");
  } catch {
    toast.error("Failed to send email");
  }
};

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5]">
        <h2 className="text-xl font-bold text-[#007FFF] animate-bounce">Loading...</h2>
      </div>
    );
  }

  const accountAgeDays = Math.floor(
    (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-5xl mx-auto p-6 space-y-8">

        {/* ================= EMAIL VERIFY BANNER ================= */}
        {!user.isEmailVerified && (
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md border border-red-100 p-4 rounded-[22px] shadow-sm">
            <div className="flex items-center gap-3 px-2">
              <ShieldAlert className="text-red-500" size={20} />
              <p className="text-sm font-semibold text-gray-700">
                Email not verified. Verify now!
              </p>
            </div>
            <button
              onClick={resendVerification}
              className="bg-[#007FFF] text-white text-[11px] font-bold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#007FFF]/30 transition-all active:scale-95"
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
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Dashboard Overview</p>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white/90 backdrop-blur-2xl border border-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            
            {/* Soft Shadow Profile Ring */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#007FFF] to-[#7EBFFF] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src={user.profilePic || "https://via.placeholder.com/120"}
                alt="profile"
                className="relative w-36 h-36 rounded-full object-cover border-[6px] border-white shadow-xl"
              />
            </div>

            <div className="flex-1 space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">{user.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm font-medium mt-1">
                  <Mail size={16} className="text-[#007FFF]" />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* BOXES: Age, Gender, Joined (Exact Reference Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoBox icon={<User size={18} />} label="Age" value={`${user.age || "N/A"} yrs`} color="text-blue-500" />
                <InfoBox icon={<Info size={18} />} label="Gender" value={user.gender || "N/A"} color="text-pink-400" />
                <InfoBox icon={<Calendar size={18} />} label="Joined" value={new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} color="text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-gray-800 px-2">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <ActionCard icon={<LayoutDashboard size={26} />} label="Browse Providers" onClick={() => navigate("/providers")} />
            <ActionCard icon={<FileText size={26} />} label="My Bookings" onClick={() => navigate("/user/bookings")} />
            <ActionCard icon={<Settings size={26} />} label="Edit Profile" onClick={() => navigate("/profile/edit")} />
          </div>
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-gray-800 px-2">Account Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatPill label="Account Age" value={`${accountAgeDays} Days`} icon={<Calendar size={18} className="text-[#007FFF]" />} />
            <StatPill label="User Role" value={user.role} icon={<ShieldAlert size={18} className="text-purple-500" />} />
            <StatPill label="Status" value={user.isEmailVerified ? "Verified" : "Pending"} icon={<CheckCircle size={18} className={user.isEmailVerified ? "text-green-500" : "text-amber-500"} />} />
          </div>
        </div>

        {/* ================= LOGOUT ================= */}
        <div className="flex justify-center md:justify-end pt-6">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 bg-white border border-red-50 text-red-500 px-10 py-4 rounded-[22px] font-bold text-sm hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Styled Sub-Components ---

const InfoBox = ({ icon, label, value, color }) => (
  <div className="bg-[#F8FAFC] border border-gray-50 p-4 rounded-[24px] flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className={`p-2.5 bg-white rounded-[16px] shadow-sm ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-0.5">{label}</p>
      <p className="text-[15px] font-bold text-gray-800 capitalize">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center gap-4 bg-white border border-white/50 p-8 rounded-[35px] hover:shadow-2xl hover:shadow-[#007FFF]/10 transition-all group">
    <div className="p-5 bg-[#F8FAFC] rounded-[24px] text-[#007FFF] group-hover:bg-[#007FFF] group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <span className="text-[13px] font-bold text-gray-600 group-hover:text-gray-900">{label}</span>
  </button>
);

const StatPill = ({ label, value, icon }) => (
  <div className="bg-white/60 border border-white p-5 rounded-[28px] flex items-center gap-5">
    <div className="p-3 bg-white rounded-2xl shadow-sm">{icon}</div>
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{label}</p>
      <h4 className="text-lg font-bold text-gray-900 leading-none mt-1 capitalize">{value}</h4>
    </div>
  </div>
);

export default UserDashboard;