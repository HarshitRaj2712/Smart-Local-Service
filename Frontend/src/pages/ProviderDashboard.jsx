import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";

const ProviderDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/booking/provider-bookings", {
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
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/booking/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBookings(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Provider Dashboard
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
                <strong>Customer:</strong> {booking.user.name}
              </p>

              <p>
                <strong>Email:</strong> {booking.user.email}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.serviceDate).toDateString()}
              </p>

              <p>
                <strong>Description:</strong> {booking.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{booking.status}</span>
              </p>

              <div className="mt-4 flex gap-4">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(booking._id, "accepted")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking._id, "cancelled")
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {booking.status === "accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "completed")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;