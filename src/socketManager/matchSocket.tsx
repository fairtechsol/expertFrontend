import { matchSocket, socket } from ".";
let currSocket: any = [];

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });

   
    matchSocket.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
    currSocket.push(
      setInterval(() => {
        matchSocket.emit("initCricketData", {
          matchId: matchId,
          roleName: roleName,
        });
      }, 120000)
    );
  },
  leaveMatchRoom: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    matchSocket?.emit("disconnectCricketData", {
      matchId: matchId,
      roleName: "expert",
    });
  },
  leaveAllRooms: () => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    matchSocket?.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  connectError: (callback: any) => {
    socket?.on("connect_error", callback);
  },
  onConnect: (callback: any) => {
    matchSocket?.on("connect", callback);
  },
  onReconnect: (callback: any) => {
    matchSocket?.on("reconnect", callback);
  },
  onDisconnect: (callback: any) => {
    matchSocket?.on("disconnect", callback);
  },
  getMatchRates: (matchId: string, callback: any) => {
    matchSocket?.on(`liveData${matchId}`, callback);
  },
  matchAddedOff: () => {
    socket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: string) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    matchSocket?.off(`liveData${matchId}`);
  },
  connectErrorOff: () => {
    socket?.off("connect_error");
  },
  onConnectOff: () => {
    matchSocket?.off("connect");
  },
};
