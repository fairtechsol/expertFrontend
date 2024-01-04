import { expertSocket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any) => {
    expertSocket.emit("matchRoom", {
      match: {
        id: matchId,
      },
    });
  },
  leaveAllRooms: () => {
    expertSocket.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    expertSocket.on("addMatch", callback);
  },
};
