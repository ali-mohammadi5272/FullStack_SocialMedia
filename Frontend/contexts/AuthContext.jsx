"use client";
import { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 1, username: "ali" });
  const [contact, setContact] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        contact,
        setContact,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
A