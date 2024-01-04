import { expertSocket } from ".";

export const userSocketService = {
  userCount: (callback: any) => {
    expertSocket.on("loginUserCount", (packet: any) => {
      callback(packet?.count);
    });
  },
  updateSessionRate: (data: any) => {
    expertSocket.emit("updateSessionRate", data);
  },
  updateSessionRateClient: () => {
    expertSocket.on("updateSessionRateClient", (packet: any) => {
      console.log(packet);
    });
  },
};
