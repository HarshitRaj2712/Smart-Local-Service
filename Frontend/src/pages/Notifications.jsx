import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getSocket } from "../utils/socket";

const Notifications = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const socket = useMemo(() => getSocket(token), [token]);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await API.get("/notification/my-notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const unreadNotifications = (data.notifications || []).filter(
        (item) => !item.isRead
      );

      setNotifications(unreadNotifications);
      setUnreadCount(data.unreadCount || unreadNotifications.length);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token, fetchNotifications]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [socket]);

  const markOneRead = async (id) => {
    try {
      await API.put(
        `/notification/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) => prev.filter((item) => item._id !== id));

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch {
      // Keep UI unchanged if request fails.
    }
  };

  const markAllRead = async () => {
    try {
      await API.put(
        "/notification/mark-all-read",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications([]);
      setUnreadCount(0);
    } catch {
      // Keep UI unchanged if request fails.
    }
  };

  const handleOpenNotification = async (item) => {
    if (!item.relatedBooking) return;

    if (!item.isRead) {
      await markOneRead(item._id);
    }

    navigate(`/chat/${item.relatedBooking}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] px-4 py-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#e7f0fb] shadow-sm p-5 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-[#1b2a41]">
            All Messages
          </h1>
          <button
            onClick={markAllRead}
            className="text-sm font-semibold text-[#007FFF]"
          >
            Mark all read
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Unread: {unreadCount}
        </p>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border p-4 bg-blue-50 border-blue-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markOneRead(item._id)}
                      className="text-xs font-semibold text-[#007FFF]"
                    >
                      Mark read
                    </button>

                    {item.relatedBooking && (
                      <button
                        onClick={() => handleOpenNotification(item)}
                        className="text-xs font-semibold bg-[#007FFF] text-white px-3 py-2 rounded-lg"
                      >
                        Open
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
