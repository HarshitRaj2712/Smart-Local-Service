import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const [leaderboard, setLeaderboard] = useState([]);

  const [stats, setStats] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await API.get(
          "/admin/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const revenueRes = await API.get(
          "/admin/monthly-revenue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const leaderboardRes = await API.get(
          "/admin/leaderboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLeaderboard(leaderboardRes.data);

        setStats(analyticsRes.data);
        setMonthlyRevenue(revenueRes.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  if (!stats) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const chartData = {
    labels: monthlyRevenue.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: monthlyRevenue.map(
          (item) => item.totalRevenue
        ),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Admin Revenue Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h3>Total Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ₹{stats.totalRevenue}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h3>Platform Commission</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            ₹{stats.totalCommission}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h3>Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.totalBookings}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Revenue
        </h3>
        <Bar data={chartData} />
      </div>

      <div className="mt-8 bg-white shadow-md p-6 rounded-xl">
  <h3 className="text-lg font-semibold mb-4">
    Month-over-Month Growth
  </h3>

  <div className="grid md:grid-cols-3 gap-4">
    {monthlyRevenue.map((item, index) => (
      <div
        key={index}
        className="border p-4 rounded-lg text-center"
      >
        <p className="font-semibold">
          {item.year}-{item.month}
        </p>

        <p className="text-green-600 font-bold mt-1">
          ₹{item.totalRevenue}
        </p>

        <p
          className={`mt-1 font-bold ${
            item.growth >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
        <p
          className={`mt-1 font-bold flex justify-center items-center gap-1 ${
            item.growth >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {item.growth >= 0 ? "▲" : "▼"} {item.growth}%
        </p>        </p>

        <div className="mt-10 bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            🏆 Top Providers by Earnings
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Earnings</th>
                  <th className="p-3 text-left">Trust Score</th>
                  <th className="p-3 text-left">Completed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((provider) => (
                  <tr
                    key={provider.rank}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-bold">
                      #{provider.rank}
                    </td>
                    <td className="p-3">
                      {provider.name}
                    </td>
                    <td className="p-3 text-green-600 font-semibold">
                      ₹{provider.totalEarnings}
                    </td>
                    <td className="p-3 text-blue-600">
                      {provider.trustScore?.toFixed(0)}
                    </td>
                    <td className="p-3">
                      {provider.completedBookings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default AdminDashboard;