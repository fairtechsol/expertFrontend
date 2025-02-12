import { socket } from ".";


export const userSocketService = {
  userCount: (callback: any) => {
    socket?.on("loginUserCount", (packet: any) => {
      callback(packet?.count);
    });
  },
  updateSessionRate: (data: any) => {
    socket?.emit("updateSessionRate", data);
  },
  updateSessionRateClient: (callback: any) => {
    socket?.on("updateSessionRateClient", callback);
  },
  updateMatchBettingRate: (data: any) => {
    socket?.emit("updateMatchBettingRate", data);
  },
  updateMatchBettingRateClient: (callback: any) => {
    socket?.on("updateMatchBettingRateClient", callback);
  },
  sessionResultDeclared: (callback: any) => {
    socket?.on("sessionResultDeclared", callback);
  },
  userSessionBetPlaced: (callBack: any) => {
    socket?.on("userSessionBetPlaced", callBack);
  },
  userMatchBetPlaced: (callBack: any) => {
    socket?.on("userMatchBetPlaced", callBack);
  },
  matchBettingStatusChange: (callback: any) => {
    socket?.on("matchBettingStatusChange", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResultDeclared", callback);
  },
  matchResultDeclareAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket?.on("matchResultUnDeclared", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on("sessionDeleteBet", callback);
  },
  sessionAdded: (callback: any) => {
    socket?.on("sessionAdded", callback);
  },
  sessionUpdated: (callback: any) => {
    socket?.on("sessionUpdated", callback);
  },
  updateInResultDeclare: (callback: any) => {
    socket?.on("updateInResultDeclare", callback);
  },
  matchResultUnDeclareAllUser: (callback: any) => {
    socket?.on("matchResultUnDeclareAllUser", callback);
  },
  multiSessionUpdated: (callback: any) => {
    socket?.on("multiSessionUpdated", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  betVerify: (callback: any) => {
    socket?.on(`verifyBet`, callback);
  },
  matchBettingMinMaxChange: (callback: any) => {
    socket?.on("matchBettingMinMaxChange", callback);
  },
  updateSessionRateClientOff: () => {
    socket?.off("updateSessionRateClient");
  },
  updateMatchBettingRateClientOff: () => {
    socket?.off("updateMatchBettingRateClient");
  },
  sessionResultDeclaredOff: () => {
    socket?.off("sessionResultDeclared");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  matchBettingStatusChangeOff: () => {
    socket?.off("matchBettingStatusChange");
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResultDeclared");
  },
  matchResultUnDeclaredOff: () => {
    socket?.off("matchResultUnDeclared");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  sessionAddedOff: () => {
    socket?.off("sessionAdded");
  },
  sessionUpdatedOff: () => {
    socket?.off("sessionUpdated");
  },
  updateInResultDeclareOff: () => {
    socket?.off("updateInResultDeclare");
  },
  matchResultUnDeclareAllUserOff: () => {
    socket?.off("matchResultUnDeclareAllUser");
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
  betVerifyOff: () => {
    socket?.off("verifyBet");
  },
  matchResultDeclareAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  multiSessionUpdatedOff: () => {
    socket?.off("multiSessionUpdated");
  },
  matchBettingMinMaxChangeOff: () => {
    socket?.off("matchBettingMinMaxChange");
  },
};
