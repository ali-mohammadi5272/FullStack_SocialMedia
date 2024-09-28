"use client";
import CustomForm from "@/components/modules/CustomForm/CustomForm";
import styles from "./registerPage.module.scss";
import { useState } from "react";
import { axiosRequest } from "@/services/axios";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/helperFunctions";
import ToggleThemeBtn from "@/components/modules/ToggleTheme/ToggleThemeBtn";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  const inputs = [
    {
      id: 1,
      inputId: "firstname",
      keyName: "firstname",
      placeholder: "Firstname",
      required: true,
      type: "text",
    },
    {
      id: 2,
      inputId: "lastname",
      keyName: "lastname",
      placeholder: "Lastname",
      required: true,
      type: "text",
    },
    {
      id: 3,
      inputId: "username",
      keyName: "username",
      placeholder: "Username",
      required: true,
      type: "text",
    },
    {
      id: 4,
      inputId: "email",
      keyName: "email",
      placeholder: "Email",
      required: true,
      type: "email",
    },
    {
      id: 5,
      inputId: "age",
      keyName: "age",
      placeholder: "Age",
      required: true,
      type: "number",
    },
    {
      id: 6,
      inputId: "Phone",
      keyName: "phone",
      placeholder: "Phone",
      required: true,
      type: "number",
    },
    {
      id: 7,
      inputId: "password",
      keyName: "password",
      placeholder: "Password",
      required: true,
      type: "text",
    },
    {
      id: 8,
      inputId: "confirmPassword",
      keyName: "confirmPassword",
      placeholder: "Confirm Password",
      required: true,
      type: "text",
    },
  ];

  const formChangeHandler = (e) => {
    if (e.target.value.trim()) {
      setFormData({
        ...formData,
        [e.target.dataset.key]:
          e.target.dataset.key === "age"
            ? +e.target.value
            : e.target.value.trim(),
      });
    } else {
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
      const response = await axiosRequest.post("/auth/register", formData);
      if (response && response.status === 201) {
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
    }
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.page__title}>Register</h1>
      <CustomForm
        formClassName={styles.page__form}
        formOnChange={formChangeHandler}
        inputs={inputs}
        formOnReset={formResetHandler}
        formOnSubmit={formSubmitHandler}
        isFormEmpty={formData}
      />
      <div>
        <span>Already registered? </span>
        <Link className={styles.page__link} href="/login">
          Sign In
        </Link>
      </div>
      <ToggleThemeBtn className={styles.page__toggleThemeBtn} />
    </main>
  );
};

export default RegisterPage;
