import axios from "axios";
import { toast } from "react-toastify";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const service = axios.create({
  baseURL: "http://localhost:5000/",
});

service.defaults.timeout = 100000;

service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    const authToken = localStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data?.message, toastOptions);
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
      window.location.replace("/login");
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default service;
