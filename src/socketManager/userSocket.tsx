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
  userSessionBetPlaced: (callBack: any) => {
    socket.on("userSessionBetPlaced", callBack);
  },
  userMatchBetPlaced: (callBack: any) => {
    socket.on("userMatchBetPlaced", callBack);
  },
  matchBettingStatusChange: (callback: any) => {
    socket.on("matchBettingStatusChange", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket.on("matchResultDeclared", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket.on("matchResultUnDeclared", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket.on("sessionDeleteBet", callback);
  },
  sessionAdded: (callback: any) => {
    socket.on("sessionAdded", callback);
  },
  updateSessionRateClientOff: () => {
    socket.off("updateSessionRateClient");
  },
  updateMatchBettingRateClientOff: () => {
    socket.off("updateMatchBettingRateClient");
  },
  sessionResultDeclaredOff: () => {
    socket.off("sessionResultDeclared");
  },
  userSessionBetPlacedOff: () => {
    socket.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket.off("userMatchBetPlaced");
  },
  matchBettingStatusChangeOff: () => {
    socket.off("matchBettingStatusChange");
  },
  matchResultDeclaredOff: () => {
    socket.off("matchResultDeclared");
  },
  matchResultUnDeclaredOff: () => {
    socket.off("matchResultUnDeclared");
  },
  matchDeleteBetOff: () => {
    socket.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket.off("sessionDeleteBet");
  },
  sessionAddedOff: () => {
    socket.off("sessionAdded");
  },
};
