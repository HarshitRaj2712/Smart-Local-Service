import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const ProviderDetail = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      const { data } = await API.get(`/provider/${id}`);
      setProvider(data);
    };

    fetchProvider();
  }, [id]);

  if (!provider) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        {provider.user?.name}
      </h2>

      <p className="mb-2">
        <strong>Service:</strong> {provider.serviceType}
      </p>

      <p className="mb-2">
        <strong>Experience:</strong> {provider.experience} years
      </p>

      <p className="mb-6">
        <strong>Bio:</strong> {provider.bio}
      </p>

      <h3 className="text-xl font-semibold mb-4">
        Portfolio
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {provider.portfolioImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Portfolio"
            className="rounded-lg"
          />
        ))}
      </div>

      <button
        onClick={() => navigate(`/book/${provider._id}`)}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
        Book Service
        </button>
    </div>
  );
};

export default ProviderDetail;