import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Chats = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await API.get("/chat/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConversations(data || []);
      } catch {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchConversations();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] px-4 py-24">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#e7f0fb] shadow-sm p-5 md:p-7">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#1b2a41]">Chats</h1>
          <p className="text-sm text-gray-500 mt-1">
            All user/provider conversations in one place.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading chats...</p>
        ) : conversations.length === 0 ? (
          <p className="text-gray-500">No chats yet.</p>
        ) : (
          <div className="space-y-3">
            {conversations.map((chat) => (
              <button
                key={chat.bookingId}
                onClick={() => navigate(`/chat/${chat.bookingId}`)}
                className="w-full text-left rounded-xl border border-gray-100 hover:border-[#d7e9ff] bg-white hover:bg-[#f8fbff] p-4 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#007FFF] text-white font-bold text-sm flex items-center justify-center">
                      {chat.counterpart?.name?.charAt(0) || "U"}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">
                        {chat.counterpart?.name || "Unknown user"}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {chat.counterpart?.role || "user"} • {chat.serviceType}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(chat.latestMessageAt).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-sm text-gray-600 mt-2 truncate">
                  {chat.latestMessage}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
