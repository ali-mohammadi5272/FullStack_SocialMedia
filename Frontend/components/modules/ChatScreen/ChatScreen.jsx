"use client";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import styles from "./chatScreen.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ChatMessageInput from "../ChatMessageInput/ChatMessageInput";

const ChatScreen = () => {
  const { contact, chatMessages } = useContext(AuthContext);

  return (
    <section className={styles.chatScreen}>
      <ChatHeader />
      <section className={styles.chatSection}>
        {chatMessages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
      </section>
      {contact && <ChatMessageInput />}
    </section>
  );
};

export default ChatScreen;
