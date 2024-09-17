import axios from "axios";
import { toast } from "react-toastify";

const axiosRequest = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    toast.error(err.response.data.message);
    return Promise.reject(err);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (err) => {
    if (err.code === "ERR_NETWORK") {
      toast.error(err.message);
    }

    const isErrorAnArray =
      typeof err.response.data === "object" &&
      "length" in err.response.data &&
      err.response.data.length;

    if (isErrorAnArray) {
      err.response.data.forEach((error) => {
        toast.error(error.message);
      });
    } else {
      toast.error(err.response.data.message);
    }
    return Promise.reject(err);
  }
);

export { axiosRequest };
