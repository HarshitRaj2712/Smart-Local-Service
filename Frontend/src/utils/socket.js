import { io } from "socket.io-client";

let socketInstance = null;
let socketToken = null;

const getSocketServerUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";

  // API uses /api base path, but Socket.IO is exposed at backend root.
  return apiUrl.replace(/\/api\/?$/, "");
};

export const getSocket = (token) => {
  if (!token) return null;

  if (socketInstance && socketToken !== token) {
    socketInstance.disconnect();
    socketInstance = null;
    socketToken = null;
  }

  if (!socketInstance) {
    socketInstance = io(getSocketServerUrl(), {
      path: "/socket.io",
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token,
      },
    });

    socketToken = token;
  }

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    socketToken = null;
  }
};
