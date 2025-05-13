import axios from "axios";
import { toast } from "react-toastify";
import { serviceUrl } from "./utils/Constants";

const toastOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const service = axios.create({
  baseURL: serviceUrl,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
  },
});

service.defaults.timeout = 100000;

const cancelTokenSources: { [key: string]: any } = {};

service.interceptors.request.use(
  (config) => {
    const requestUrl = config.url;
    if (requestUrl && cancelTokenSources[requestUrl]) {
      cancelTokenSources[requestUrl].cancel(
        `Canceled previous request to ${requestUrl}`
      );
    }

    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    cancelTokenSources[requestUrl!] = source;

    config.headers["Content-Type"] = "application/json";

    const authToken = sessionStorage.getItem("jwtExpert");
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

    const requestUrl = response.config.url;

    if (requestUrl) {
      delete cancelTokenSources[requestUrl];
    }

    if (!isGetRequest && response.data?.message) {
      toast.success(response.data.message, toastOptions);
    }

    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
      // return;
    }

    let { status, data } = error.response || {};

    if (status === 500) {
      toast.error(data?.message, toastOptions);
    } else if (
      status === 403 ||
      status === 404 ||
      status === 400 ||
      status === 409
    ) {
      toast.error(data?.message, toastOptions);
    } else if (status === 401) {
      // toast.error(error.response.data.message, toastOptions);
      window.location.replace("/expert/login");
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default service;
