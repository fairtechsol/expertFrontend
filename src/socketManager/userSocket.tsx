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
  updateSessionRateClientOff: (callback: any) => {
    socket.off("updateSessionRateClient", callback);
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
  updateMatchBettingRateClientOff: (callback: any) => {
    socket.off("updateMatchBettingRateClient", callback);
  },
  sessionResultDeclaredOff: (callback: any) => {
    socket.off("sessionResultDeclared", callback);
  },
  userSessionBetPlacedOff: (callBack: any) => {
    socket.off("userSessionBetPlaced", callBack);
  },
  userMatchBetPlacedOff: (callBack: any) => {
    socket.off("userMatchBetPlaced", callBack);
  },
  matchBettingStatusChangeOff: (callback: any) => {
    socket.off("matchBettingStatusChange", callback);
  },
  matchResultDeclaredOff: (callback: any) => {
    socket.off("matchResultDeclared", callback);
  },
  matchResultUnDeclaredOff: (callback: any) => {
    socket.off("matchResultUnDeclared", callback);
  },
  matchDeleteBetOff: (callback: any) => {
    socket.off("matchDeleteBet", callback);
  },
  sessionDeleteBetOff: (callback: any) => {
    socket.off("sessionDeleteBet", callback);
  },
  sessionAddedOff: (callback: any) => {
    socket.off("sessionAdded", callback);
  },
};
