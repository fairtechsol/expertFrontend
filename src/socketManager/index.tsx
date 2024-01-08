import io from "socket.io-client";
import { baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userSocketService } from "./userSocket";

export const matchSocket = io(baseUrls.matchSocket, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const socket = io(baseUrls.expertSocket, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const socketService = {
  connect: () => {
    // Connect to the socket server
    socket.connect();
    matchSocket.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket.disconnect();
    matchSocket.disconnect();
  },
  auth: { ...authSocketService },
  user: { ...userSocketService },
  // Add other socket-related methods as needed
};

export const expertSocketService = {
  match: { ...matchSocketService },
};
