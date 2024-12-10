import axios from "axios";
import { toast } from "react-toastify";
import { serviceUrl } from "./utils/Constants";
import {
  decryptAESKeyWithRSA,
  decryptWithAES,
  encryptAESKeyWithRSA,
  encryptWithAES,
  generateRandomBytes,
} from "./utils/encryptDecrypt";

const toastOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const aesKey = Array.from(generateRandomBytes(32))
  .map((byte) => String.fromCharCode(byte))
  .join("");

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

    if (config.data) {
      const encryptedData = encryptWithAES(config.data, aesKey);
      const encryptedKey = encryptAESKeyWithRSA(aesKey);
      config.data = { encryptedData, encryptedKey };
    }

    let [url, query]: any = config?.url?.split("?");
    // Encrypt query parameters if exists
    if (query) {
      const params = query.split("&")?.reduce((prev: any, curr: any) => {
        const [key, val] = curr.split("=");
        prev[key] = val;
        return prev;
      }, {});
      const encryptedData = encryptWithAES(params, aesKey);
      const encryptedKey = encryptAESKeyWithRSA(aesKey);
      config.params = {
        encryptedData: encryptedData,
        encryptedKey: encryptedKey,
      };
      config.url = url;
    }

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
    if (response.data?.encryptedData && response.data?.encryptedKey) {
      const aesKey = decryptAESKeyWithRSA(response.data.encryptedKey);
      response.data = decryptWithAES(response.data.encryptedData, aesKey);
    }

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
      return;
    }

    let { status, data } = error.response || {};
    const aesKey = decryptAESKeyWithRSA(data.encryptedKey);
    data = decryptWithAES(data.encryptedData, aesKey);

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
