import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data } = await API.get("/provider/approved");
        setProviders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Service Providers
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Link
            key={provider._id}
            to={`/providers/${provider._id}`}
            className="block"
          >
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
              <img
                src={provider.idProof}
                alt="ID Proof"
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl font-semibold">
                {provider.user.name}
              </h3>

              <p className="text-gray-600 mt-2">
                Service: {provider.serviceType}
              </p>

              <p className="mt-2 text-yellow-500 font-semibold">
                ⭐ {provider.averageRating?.toFixed(1) || 0}
                <span className="text-gray-600 text-sm ml-2">
                  ({provider.totalReviews || 0} reviews)
                </span>
              </p>

              <p className="text-gray-600">
                Experience: {provider.experience} years
              </p>

              <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Verified Provider
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Providers;