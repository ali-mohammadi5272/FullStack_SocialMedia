"use client";
import React, { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={io}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
