import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Trophy,
  BarChart3,
  Calendar,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { getThemeTokens, useThemeMode } from "../utils/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = useThemeMode();
  const chartTheme = getThemeTokens();

  const [stats, setStats] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await API.get("/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const revenueRes = await API.get("/admin/monthly-revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const leaderboardRes = await API.get("/admin/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(analyticsRes.data);
        setMonthlyRevenue(revenueRes.data);
        setLeaderboard(leaderboardRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  if (!stats) return <p className="text-center mt-20">Loading...</p>;

  const chartData = {
    labels: monthlyRevenue.map((m) => m.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue.map((m) => m.totalRevenue),
        backgroundColor: "#007FFF",
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartTheme.text,
        },
      },
      tooltip: {
        backgroundColor: chartTheme.surface,
        titleColor: chartTheme.text,
        bodyColor: chartTheme.text,
        borderColor: chartTheme.border,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: chartTheme.muted,
        },
        grid: {
          color: chartTheme.border,
        },
      },
      y: {
        ticks: {
          color: chartTheme.muted,
        },
        grid: {
          color: chartTheme.border,
        },
      },
    },
  };

  const accountAge = Math.floor(
    (new Date() - new Date(user.createdAt)) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div key={theme} className="min-h-screen bg-(--bg-main) pb-20">
      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">
            Welcome Admin,
            <span className="text-[#007FFF]"> {user.name}</span>
          </h1>
          <p className="text-(--text-muted) text-xs uppercase tracking-widest mt-2">
            Platform Control Center
          </p>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<Wallet />}
            title="Total Revenue"
            value={`₹${stats.totalRevenue}`}
            color="text-green-600"
          />

          <StatCard
            icon={<BarChart3 />}
            title="Platform Commission"
            value={`₹${stats.totalCommission}`}
            color="text-red-500"
          />

          <StatCard
            icon={<Trophy />}
            title="Total Bookings"
            value={stats.totalBookings}
            color="text-blue-600"
          />
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-(--bg-surface) border border-(--border-color) p-8 rounded-4xl shadow-md">
          <h3 className="text-lg font-bold mb-6 text-(--text-main)">
            Monthly Revenue Analytics
          </h3>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* ================= GROWTH CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          {monthlyRevenue.map((item, i) => (
            <div
              key={i}
              className="bg-(--bg-surface) border border-(--border-color) p-6 rounded-[28px] shadow-sm text-center"
            >
              <p className="font-semibold">
                {item.year}-{item.month}
              </p>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{item.totalRevenue}
              </p>

              <p
                className={`font-bold mt-1 ${
                  item.growth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.growth >= 0 ? "▲" : "▼"} {item.growth}%
              </p>
            </div>
          ))}
        </div>

        {/* ================= LEADERBOARD ================= */}
        <div className="bg-(--bg-surface) border border-(--border-color) p-8 rounded-4xl shadow-md">
          <h3 className="text-xl font-bold mb-6 text-(--text-main)">
            🏆 Top Providers
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-(--bg-muted)">
                <tr>
                  <th className="p-3 text-left text-(--text-main)">Rank</th>
                  <th className="p-3 text-left text-(--text-main)">Name</th>
                  <th className="p-3 text-left text-(--text-main)">Earnings</th>
                  <th className="p-3 text-left text-(--text-main)">Trust</th>
                  <th className="p-3 text-left text-(--text-main)">Completed</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((p) => (
                  <tr
                    key={p.rank}
                    className="border-b border-(--border-color) hover:bg-(--bg-muted)"
                  >
                    <td className="p-3 font-bold">#{p.rank}</td>
                    <td className="p-3 text-(--text-main)">{p.name}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ₹{p.totalEarnings}
                    </td>
                    <td className="p-3 text-blue-600">
                      {p.trustScore?.toFixed(0)}
                    </td>
                    <td className="p-3 text-(--text-main)">
                      {p.completedBookings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= ACCOUNT OVERVIEW ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Account Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <AccountCard
              icon={<Calendar />}
              title="Account Age"
              value={`${accountAge} Days`}
            />

            <AccountCard
              icon={<ShieldCheck />}
              title="Role"
              value="Administrator"
            />

            <AccountCard
              icon={<ShieldCheck />}
              title="Status"
              value="Verified"
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 bg-(--bg-surface) border border-(--border-color) text-red-500 px-8 py-3 rounded-full font-bold hover:bg-red-500 hover:text-white transition"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-(--bg-surface) border border-(--border-color) p-6 rounded-[28px] shadow-sm text-center">
    <div className={`mx-auto mb-3 ${color}`}>{icon}</div>
    <p className="text-(--text-muted) text-xs uppercase">{title}</p>
    <h3 className={`text-2xl font-extrabold ${color}`}>
      {value}
    </h3>
  </div>
);

const AccountCard = ({ icon, title, value }) => (
  <div className="bg-(--bg-surface) border border-(--border-color) p-6 rounded-[28px] flex gap-4 items-center shadow-sm">
    <div className="text-[#007FFF]">{icon}</div>
    <div>
      <p className="text-xs text-(--text-muted) uppercase">{title}</p>
      <h3 className="text-lg font-bold text-(--text-main)">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;