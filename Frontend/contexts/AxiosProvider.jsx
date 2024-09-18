"use client";
import { createContext } from "react";
import { axiosRequest } from "@/services/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const router = useRouter();

  axiosRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        router.replace("/login");
      }
    }
  );

  return (
    <AxiosContext.Provider value={axiosRequest}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
