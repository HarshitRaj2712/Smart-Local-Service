import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { getSocket } from "../utils/socket";

const ChatRoom = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const socket = useMemo(() => getSocket(token), [token]);

  useEffect(() => {
    let mounted = true;

    const fetchMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await API.get(`/chat/${bookingId}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (mounted) {
          setMessages(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || "Could not load chat");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (token && bookingId) {
      fetchMessages();
    }

    return () => {
      mounted = false;
    };
  }, [bookingId, token]);

  useEffect(() => {
    if (!socket || !bookingId) return;

    socket.emit("chat:join-booking", { bookingId });

    const handleNewMessage = (newMessage) => {
      if (String(newMessage.booking) !== String(bookingId)) return;

      setMessages((prev) => {
        const exists = prev.some((item) => item._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on("chat:new-message", handleNewMessage);

    return () => {
      socket.off("chat:new-message", handleNewMessage);
    };
  }, [bookingId, socket]);

  const handleSend = (e) => {
    e.preventDefault();

    const clean = text.trim();
    if (!clean || !socket) return;

    socket.emit("chat:send-message", {
      bookingId,
      message: clean,
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-(--bg-main) px-4 py-24 transition-colors duration-200">
      <div className="max-w-3xl mx-auto bg-(--bg-surface) rounded-2xl shadow-md border border-(--border-color)">
        <div className="px-5 py-4 border-b border-(--border-color) flex items-center justify-between">
          <h1 className="text-xl font-bold text-(--text-main)">Booking Chat</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-[#007FFF]"
          >
            Back
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-(--text-muted)">Loading messages...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <div className="h-[55vh] overflow-y-auto p-5 space-y-3 bg-(--bg-muted)">
            {messages.length === 0 ? (
              <p className="text-(--text-muted) text-sm">No messages yet. Say hello.</p>
            ) : (
              messages.map((message) => {
                const isMine = String(message.sender?._id) === String(user?.id);

                return (
                  <div
                    key={message._id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isMine
                          ? "bg-[#007FFF] text-white rounded-br-md"
                          : "bg-(--bg-surface) text-(--text-main) border border-(--border-color) rounded-bl-md"
                      }`}
                    >
                      <p>{message.message}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          isMine ? "text-blue-100" : "text-(--text-muted)"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message"
            className="flex-1 border border-(--border-color) rounded-xl px-4 py-2 outline-none bg-(--bg-surface) text-(--text-main) placeholder:text-(--text-muted) focus:border-[#007FFF]"
          />
          <button
            type="submit"
            className="bg-[#007FFF] text-white px-5 py-2 rounded-xl font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
