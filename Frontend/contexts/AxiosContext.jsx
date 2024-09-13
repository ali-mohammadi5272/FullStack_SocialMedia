"use client";
import { createContext } from "react";
import { axiosRequest } from "@/services/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const router = useRouter();

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

      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        router.replace("/login");
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
      console.log(err);
      return Promise.reject(err);
    }
  );

  return (
    <AxiosContext.Provider value={axiosRequest}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
