"use client";
import React, { createContext, useState } from "react";
import { themes } from "@/utils/constants";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme") || themes.DARK;
    return currentTheme;
  });

  const setThemeDark = () => {
    setTheme(themes.DARK);
    localStorage.setItem("theme", themes.DARK);
  };

  const setThemeLight = () => {
    setTheme(themes.LIGHT);
    localStorage.setItem("theme", themes.LIGHT);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeDark,
        setThemeLight,
      }}
    >
      <div className="App" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
