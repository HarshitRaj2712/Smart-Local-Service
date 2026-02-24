import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

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
        params: {
          sortBy,
          minRating,
          service,
        },
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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Service Providers
      </h2>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 grid md:grid-cols-3 gap-4">

        <div>
          <label className="block font-medium mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="trust">Trust Score</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Minimum Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Service Type</label>
          <input
            type="text"
            placeholder="Electrician, Plumber..."
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

      </div>

      {/* Providers List */}
      {loading ? (
        <p className="text-center">Loading providers...</p>
      ) : providers.length === 0 ? (
        <p className="text-center">No providers found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <Link
              key={provider._id}
              to={`/providers/${provider._id}`}
              className="block"
            >
              <div className="relative bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition cursor-pointer">

                <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                  #{index + 1}
                </div>

                <img
                  src={provider.idProof}
                  alt="ID Proof"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h3 className="text-xl font-semibold">
                  {provider.user?.name}
                </h3>

                <p className="text-gray-600">
                  Service: {provider.serviceType}
                </p>

                <p className="text-gray-600">
                  Experience: {provider.experience} years
                </p>

                <p className="mt-2 text-yellow-500 font-semibold">
                  ⭐ {provider.averageRating?.toFixed(1) || "0.0"}
                  <span className="text-gray-600 text-sm ml-2">
                    ({provider.totalReviews || 0} reviews)
                  </span>
                </p>

                <p className="text-blue-600 font-semibold mt-1">
                  Trust Score: {provider.trustScore?.toFixed(0) || 0}/100
                </p>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Providers;