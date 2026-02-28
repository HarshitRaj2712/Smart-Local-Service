import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Calendar,
  Settings,
  LogOut,
  FileText,
  ShieldAlert,
  CheckCircle,
  Star,
  Trophy,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";

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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const createdDate = new Date(user?.createdAt || Date.now());
  const today = new Date();
  const accountAge = Math.floor(
    (today - createdDate) / (1000 * 60 * 60 * 24)
  );

  /* ================= VERIFY EMAIL ================= */
  const resendVerification = async () => {
    try {
      await API.post(
        "/auth/resend-verification",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Verification email sent 📩");
    } catch {
      toast.error("Failed to send email");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  /* ================= FETCH DATA ================= */
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

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await API.put(
      `/booking/update-status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchBookings();
    fetchAnalytics();
  };

  if (!user) return null;

  /* ================= CHART DATA ================= */
  const pieData = stats && {
    labels: ["Completed", "Cancelled"],
    datasets: [
      {
        data: [stats.completedBookings, stats.cancelledBookings],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const barData = stats && {
    labels: ["Completion", "Trust"],
    datasets: [
      {
        label: "Score %",
        data: [stats.completionRate, stats.trustScore],
        backgroundColor: ["#007FFF", "#8b5cf6"],
        borderRadius: 12,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] pb-16">
      <div className="max-w-6xl mx-auto p-6 space-y-8">

        {/* EMAIL VERIFY */}
        {!user.isEmailVerified && (
          <div className="flex justify-between items-center bg-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-500" size={20} />
              <p>Email not verified. Verify now!</p>
            </div>

            <button
              onClick={resendVerification}
              className="bg-[#007FFF] text-white px-5 py-2 rounded-full text-xs font-bold"
            >
              Verify Email
            </button>
          </div>
        )}

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">
            Welcome, <span className="text-[#007FFF]">{user.name}</span>
          </h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            Provider Control Panel
          </p>
        </div>

        {/* PROFILE */}
        <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <img
            src={user.profilePic || "https://via.placeholder.com/120"}
            className="w-32 h-32 rounded-full object-cover"
            alt="provider"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center gap-2 text-gray-500">
              <Mail size={16} /> {user.email}
            </div>

            <p className="text-sm mt-2 text-orange-500 font-bold">
              Joined{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>

        {/* NAV */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "overview"
                ? "bg-[#007FFF] text-white"
                : "bg-white"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "bookings"
                ? "bg-[#007FFF] text-white"
                : "bg-white"
            }`}
          >
            Bookings
          </button>

          <button
            onClick={() => navigate("/provider/setup")}
            className="px-6 py-2 bg-white rounded-full flex items-center gap-2"
          >
            <Settings size={14} /> Edit
          </button>
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && stats && (
          <>
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard label="Total Bookings" value={stats.totalBookings} icon={<FileText />} />
              <StatCard label="Avg Rating" value={stats.averageRating?.toFixed(1)} icon={<Star />} />
              <StatCard label="Trust Score" value={stats.trustScore?.toFixed(0)} icon={<Trophy />} />
              <StatCard label="Earnings" value={`₹${stats.totalEarnings}`} icon={<Wallet />} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl">
                <Pie data={pieData} />
              </div>

              <div className="bg-white p-6 rounded-xl">
                <Bar data={barData} />
              </div>
            </div>
          </>
        )}

        {/* ================= BOOKINGS ================= */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div>
                  <h4 className="font-bold">{booking.user.name}</h4>
                  <p className="text-xs text-gray-400">
                    {new Date(booking.serviceDate).toDateString()}
                  </p>
                  <p className="italic text-sm mt-1">
                    "{booking.description}"
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`px-4 py-1 rounded-full text-xs font-bold ${
                    booking.status === "pending"
                      ? "bg-amber-100 text-amber-600"
                      : booking.status === "accepted"
                      ? "bg-blue-100 text-blue-600"
                      : booking.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {booking.status}
                </span>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">

                  {/* Pending */}
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(booking._id, "accepted")
                        }
                        className="bg-green-500 text-white px-3 py-2 rounded-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(booking._id, "cancelled")
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* Accepted → Completed */}
                  {booking.status === "accepted" && (
                    <button
                      onClick={() =>
                        updateStatus(booking._id, "completed")
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Mark Completed ✅
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACCOUNT OVERVIEW */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <StatCard label="Account Age" value={`${accountAge} Days`} icon={<Calendar />} />
          <StatCard label="Role" value={user.role} icon={<ShieldAlert />} />
          <StatCard
            label="Status"
            value={user.isEmailVerified ? "Verified" : "Pending"}
            icon={<CheckCircle />}
          />
        </div>

        {/* LOGOUT */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-8 py-3 rounded-full"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="text-xs text-gray-400 uppercase">{label}</p>
    <h3 className="text-xl font-bold">{value}</h3>
  </div>
);

export default ProviderDashboard;