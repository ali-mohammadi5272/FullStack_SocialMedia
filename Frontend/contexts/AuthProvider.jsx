"use client";
import { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [namespaceSocket, setNamespaceSocket] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        contact,
        setContact,
        users,
        setUsers,
        chatMessages,
        setChatMessages,
        namespaceSocket,
        setNamespaceSocket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
