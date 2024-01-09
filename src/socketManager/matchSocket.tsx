import { matchSocket, socket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket.emit("matchRoom", {
      id: matchId,
    });

    matchSocket.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveMatchRoom: (matchId: any) => {
    matchSocket.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  leaveAllRooms: () => {
    socket.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket.on("addMatch", callback);
  },
  getMatchRates: (matchId: string, callback: any) => {
    matchSocket.on(`liveData${matchId}`, callback);
  },
};
