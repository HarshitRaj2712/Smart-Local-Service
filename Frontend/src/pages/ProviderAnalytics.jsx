import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";

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

const ProviderAnalytics = () => {
  const { token } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/provider/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (!stats) {
    return <p className="text-center mt-10">Loading analytics...</p>;
  }

  const pieData = {
    labels: ["Completed", "Cancelled"],
    datasets: [
      {
        data: [
          stats.completedBookings,
          stats.cancelledBookings,
        ],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const barData = {
    labels: ["Completion Rate", "Trust Score"],
    datasets: [
      {
        label: "Performance %",
        data: [
          stats.completionRate,
          stats.trustScore,
        ],
        backgroundColor: ["#3b82f6", "#8b5cf6"],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Provider Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3>Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.totalBookings}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3>⭐ Average Rating</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {stats.averageRating?.toFixed(1)}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3>Trust Score</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">
            {stats.trustScore?.toFixed(0)}/100
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3>Total Earnings</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ₹{stats.totalEarnings}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3>Platform Commission</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            ₹{stats.platformCommissionGenerated}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Booking Distribution
          </h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Performance Metrics
          </h3>
          <Bar data={barData} />
        </div>

      </div>
    </div>
  );
};

export default ProviderAnalytics;