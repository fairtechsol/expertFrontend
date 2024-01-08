import { socket } from ".";

export const authSocketService = {
  logout: () => {
    socket.on("logoutUserForce", () => {
      sessionStorage.clear();
      window.location.replace("/login");
    });
  },
};
