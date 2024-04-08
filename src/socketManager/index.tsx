import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userSocketService } from "./userSocket";

export let matchSocket: any = null;
export let socket: any = null;

export const initialiseSocket = () => {
  matchSocket = io(baseUrls.matchSocket, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    auth: {
      token: `${sessionStorage.getItem("userToken")}`,
    },
  });
  socket = io(baseUrls.expertSocket, {
    transports: [`${Constants.WEBSOCKET}`],
    auth: {
      token: `${sessionStorage.getItem("userToken")}`,
    },
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
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
