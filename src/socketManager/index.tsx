import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userSocketService } from "./userSocket";

export let matchSocket: any = null;
export let socket: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.expertSocket, {
    transports: [`${Constants.WEBSOCKET}`, `${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtExpert")}`,
    },
    reconnectionDelay: 5000,
  });
};

export const initialiseMatchSocket = (matchId: string[]) => {
  matchSocket = io(baseUrls.matchSocket, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    auth: {
      token: `${sessionStorage.getItem("jwtExpert")}`,
    },
    query: {
      matchIdArray: matchId,
      roleName: "expert",
    },
    reconnection: true,
    reconnectionDelay: 5000,
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    socket?.connect();
    socket?.on("reconnect", () => {
      console.log("reconnet");
    });
    socket?.on("disconnect", () => {
      console.log("disconnect");
    });
  },
  disconnect: () => {
    socket?.disconnect();
  },
  auth: { ...authSocketService },
  user: { ...userSocketService },
};

export const matchService = {
  connect: (matchId: string[]) => {
    initialiseMatchSocket(matchId);
    matchSocket?.connect();
  },
  disconnect: () => {
    matchSocket?.disconnect();
  },
};

export const expertSocketService = {
  match: { ...matchSocketService },
};
