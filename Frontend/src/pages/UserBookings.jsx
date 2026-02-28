import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";
import toast from "react-hot-toast";

const UserBookings = () => {
  const { token } = useSelector((state) => state.auth);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/booking/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const handleReviewSubmit = async () => {
    try {
      setLoading(true);

      await API.post(
        "/review/create",
        {
          bookingId: selectedBooking._id,
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review submitted 🎉");

      // Reset state
      setSelectedBooking(null);
      setRating(5);
      setComment("");

      // Refresh bookings
      fetchBookings();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-xl p-6"
            >
              <p>
                <strong>Provider:</strong>{" "}
                {booking.provider?.serviceType}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.serviceDate).toDateString()}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {booking.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize font-semibold">
                  {booking.status}
                </span>
              </p>

              {booking.status === "completed" && !booking.isReviewed && (
                <button
                  className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  onClick={() => setSelectedBooking(booking)}
                >
                  Leave Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">
              Leave Review
            </h3>

            <label className="block mb-1 font-medium">
              Rating (1–5)
            </label>

            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />

            <label className="block mb-1 font-medium">
              Comment
            </label>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setSelectedBooking(null)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                onClick={handleReviewSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;