import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const axiosRequest = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
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
