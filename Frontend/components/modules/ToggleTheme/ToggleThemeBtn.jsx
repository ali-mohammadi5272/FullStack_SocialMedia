"use client";
import React, { useContext } from "react";
import styles from "./toggleThemeBtn.module.scss";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { themes } from "@/utils/constants";

const ToggleThemeBtn = ({ className }) => {
  const { theme, setThemeDark, setThemeLight } = useContext(ThemeContext);

  const changeThemeHandler = () => {
    theme === themes.DARK ? setThemeLight() : setThemeDark();
  };

  return (
    <button
      onClick={changeThemeHandler}
      className={
        className
          ? `${styles.toggleThemeBtn} ${className}`
          : styles.toggleThemeBtn
      }
    >
      <FontAwesomeIcon icon={theme === themes.DARK ? "faSun" : "faMoon"} />
    </button>
  );
};

export default ToggleThemeBtn;
