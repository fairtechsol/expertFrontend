import { expertSocket } from ".";

export const userSocketService = {
  userCount: (callback: any) => {
    expertSocket.on("loginUserCount", (packet: any) => {
      callback(packet?.count);
    });
  },
};
