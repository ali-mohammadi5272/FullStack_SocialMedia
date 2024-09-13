import axios from "axios";

const axiosRequest = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
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

    return Promise.reject(err);
  }
);

export { axiosRequest };
