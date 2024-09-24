"use client";
import { useEffect, useContext, useState } from "react";
import styles from "./homePage.module.scss";
import { axiosRequest } from "@/services/axios";
import { AuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/modules/Sidebar/Sidebar";
import ChatScreen from "@/components/modules/ChatScreen/ChatScreen";
import { SocketContext } from "@/contexts/SocketProvider";

const HomePage = () => {
  const [socketIo, setSocketIo] = useState(null);
  const io = useContext(SocketContext);
  const router = useRouter();
  const {
    user,
    setUser,
    setUsers,
    setContact,
    setChatMessages,
    namespaceSocket,
    setNamespaceSocket,
  } = useContext(AuthContext);

  const getUser = async (accessToken) => {
    try {
      const response = await axiosRequest.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (err) {
      return false;
    }
  };

  const authHandler = async (accessToken) => {
    const user = await getUser(accessToken);
    if (!user) {
      return router.replace("/login");
    }
    setUser(user);
  };

  const socketHandler = () => {
    if (socketIo) {
      socketIo.close();
    }
    const socket = io("ws://localhost:3000");

    setSocketIo(socket);
    socket.on("connect", () => {
      socket.on("users", (users) => {
        setUsers(users);
      });
    });
  };

  const detectUserTypingStartStatus = (socket) => {
    socket.off("userTypingStart");
    socket.on("userTypingStart", (data) => {
      if (user._id !== data.user) {
        setContact((prev) => ({ ...prev, isTyping: data.isTyping }));
      }
    });
  };

  const namespaceSocketHandler = () => {
    if (namespaceSocket) {
      namespaceSocket.close();
    }
    const socket = io("ws://localhost:3000/chats");
    socket.on("chatMessages", (messages) => {
      setChatMessages(messages);
    });
    setNamespaceSocket(socket);

    return () => {
      socket.off("chatMessages");
    };
  };

  useEffect(() => {
    const cookies = document.cookie.split(";");
    if (!(cookies.length >= 2)) {
      router.replace("/login");
    } else {
      const accessToken = cookies
        .find((cookie) => cookie.includes("accessToken"))
        .replace(/accessToken=/, "");
      authHandler(accessToken);
      socketHandler();
    }
  }, []);

  useEffect(() => {
    if (user) {
      namespaceSocketHandler();
    }
  }, [user]);

  return (
    <main className={styles.main}>
      <Sidebar />
      <ChatScreen />
    </main>
  );
};

export default HomePage;
