import { socket } from ".";

export const userSocketService = {
  userCount: (callback: any) => {
    socket.on("loginUserCount", (packet: any) => {
      callback(packet?.count);
    });
  },
  updateSessionRate: (data: any) => {
    socket.emit("updateSessionRate", data);
  },
  updateSessionRateClient: (callback: any) => {
    socket.on("updateSessionRateClient", callback);
  },
  updateMatchBettingRate: (data: any) => {
    socket.emit("updateMatchBettingRate", data);
  },
  updateMatchBettingRateClient: (callback: any) => {
    socket.on("updateMatchBettingRateClient", callback);
  },
  sessionResultDeclared: (callback: any) => {
    socket.on("sessionResultDeclared", callback);
  },
};
