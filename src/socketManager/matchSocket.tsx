import { matchSocket, socket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });

    matchSocket?.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveMatchRoom: (matchId: any) => {
    matchSocket?.emit("disconnectCricketData", {
      matchId: matchId,
      roleName: "expert",
    });
  },
  leaveAllRooms: () => {
    matchSocket?.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  connectError: (callback: any) => {
    socket?.on("connect_error", callback);
  },
  onConnect: (callback: any) => {
    socket?.on("connect", callback);
  },
  getMatchRates: (matchId: string, callback: any) => {
    matchSocket?.on(`liveData${matchId}`, callback);
  },
  matchAddedOff: () => {
    socket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: string) => {
    matchSocket?.off(`liveData${matchId}`);
  },
  connectErrorOff: () => {
    socket?.off("connect_error");
  },
  onConnectOff: () => {
    socket?.off("connect");
  },
};
