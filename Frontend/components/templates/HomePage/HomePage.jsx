"use client";
import { useEffect, useContext } from "react";
import styles from "./homePage.module.scss";
import { axiosRequest } from "@/services/axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ChatHeader from "@/components/modules/ChatHeader/ChatHeader";

const HomePage = () => {
  const [socketIo, setSocketIo] = useState(null);
  const { setUser, setUsers } = useContext(AuthContext);
  const io = useContext(SocketContext);
  const router = useRouter();

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

  return (
    <main className={styles.main}>
      <ChatHeader />
    </main>
  );
};

export default HomePage;
