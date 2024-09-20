"use client";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import styles from "./chatScreen.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const ChatScreen = () => {
  const { chatMessages } = useContext(AuthContext);

  return (
    <section className={styles.chatScreen}>
      <ChatHeader />
      <section className={styles.chatSection}>
        {chatMessages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
      </section>
    </section>
  );
};

export default ChatScreen;
