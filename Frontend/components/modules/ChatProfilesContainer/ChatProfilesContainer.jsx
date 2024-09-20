"use client";
import styles from "./chatProfilesContainer.module.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ChatProfile from "../ChatProfile/ChatProfile";
import { SocketContext } from "@/contexts/SocketProvider";

const ChatProfilesContainer = () => {
  const [socketIo, setSocketIo] = useState(null);
  const io = useContext(SocketContext);
  const { user, users, setContact } = useContext(AuthContext);

  const joinRoom = (contact) => {
    socketIo.emit("joinRoom", [
      `${user.username}-${contact.username}`,
      `${contact.username}-${user.username}`,
    ]);
  };

  const chatProfileClickHandler = (userInfo) => {
    setContact({ ...userInfo, isTyping: false });
    joinRoom(userInfo);
  };

  useEffect(() => {
    if (socketIo) {
      socketIo.close();
    }
    const socket = io("ws://localhost:3000/chats");
    setSocketIo(socket);
  }, []);

  return (
    <section className={styles.chatProfilesContainer}>
      {users.map(
        (userInfo) =>
          user &&
          user._id !== userInfo._id && (
            <ChatProfile
              key={userInfo._id}
              onClick={() => chatProfileClickHandler(userInfo)}
              imgSectionClassName={styles.chatProfilesContainer__imgSection}
              username={userInfo.username}
            />
          )
      )}
    </section>
  );
};

export default ChatProfilesContainer;
