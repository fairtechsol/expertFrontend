import { toast } from "react-toastify";
import { socket } from ".";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const authSocketService = {
  logout: () => {
    socket.on("logoutUserForce", (event: any) => {
      toast.error(event?.message, toastOptions);
      sessionStorage.clear();
      window.location.replace("/expert/login");
    });
  },
};
