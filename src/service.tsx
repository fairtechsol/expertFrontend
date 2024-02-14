import axios from "axios";
import { toast } from "react-toastify";
import { Constants } from "./utils/Constants";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

// let devUrl = "http://localhost:6060/";
// let testingUrl = "http://107.23.165.155:6060/";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertSocketBasePath}`
      : `${Constants.localPathExpert}`,
});

service.defaults.timeout = 100000;

service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    const authToken = sessionStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const isGetRequest = response.config.method === "get";

    if (!isGetRequest && response.data?.message) {
      toast.success(response.data.message, toastOptions);
    }

    return response.data;
  },
  (error) => {
    if (error.response.status === 500) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 403) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 400) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 409) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 401) {
      toast.error(error.response.data.message, toastOptions);
      window.location.replace("/expert/login");
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default service;
