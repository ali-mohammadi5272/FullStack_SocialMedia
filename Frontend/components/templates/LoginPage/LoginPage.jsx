"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./loginPage.module.scss";
import CustomForm from "@/components/modules/CustomForm/CustomForm";
import { axiosRequest } from "@/services/axios";
import { setCookie, setDataToLocalStorage } from "@/utils/helperFunctions";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  const inputs = [
    {
      id: 3,
      inputId: "username/email",
      keyName: "identifier",
      placeholder: "Username/Email",
      required: true,
      type: "text",
    },
    {
      id: 7,
      inputId: "password",
      keyName: "password",
      placeholder: "Password",
      required: true,
      type: "text",
    },
  ];

  const formChangeHandler = (e) => {
    if (e.target.value.trim()) {
      setFormData({
        ...formData,
        [e.target.dataset.key]: e.target.value.trim(),
      });
    }
    //
    else {
      if (formData) {
        setFormData((prev) => {
          delete prev[e.target.dataset.key];
          const isFormHasNoKeys = !Object.keys(prev).length;
          return isFormHasNoKeys ? null : prev;
        });
      }
    }
  };

  const formResetHandler = (e) => {
    setFormData(null);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        const response = await axiosRequest.post("/auth/login", formData);
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;

          const oneHour = 60 * 60;
          const thirtyDays = 60 * 60 * 24 * 30;

          setCookie({
            key: "accessToken",
            value: accessToken,
            maxAge: oneHour,
            path: "/",
          });

          setCookie({
            key: "refreshToken",
            value: refreshToken,
            maxAge: thirtyDays,
            path: "/",
          });

          router.replace("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.page__title}>Login</h1>
      <CustomForm
        formClassName={styles.page__form}
        formOnChange={formChangeHandler}
        inputs={inputs}
        formOnReset={formResetHandler}
        formOnSubmit={formSubmitHandler}
        isFormEmpty={formData}
      />
    </main>
  );
};

export default LoginPage;
