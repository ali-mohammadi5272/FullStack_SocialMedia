"use client";
import ChatProfile from "../ChatProfile/ChatProfile";
import styles from "./chatHeader.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const ChatHeader = () => {
  const { contact } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      {contact && (
        <ChatProfile username={contact.username} isTyping={contact.isTyping} />
      )}
    </header>
  );
};

export default ChatHeader;
