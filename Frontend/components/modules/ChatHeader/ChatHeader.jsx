"use client";
import ChatProfile from "../ChatProfile/ChatProfile";
import styles from "./chatHeader.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ToggleThemeBtn from "../ToggleTheme/ToggleThemeBtn";

const ChatHeader = () => {
  const { contact } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.header__profileSection}>
        {contact && (
          <ChatProfile
            username={contact.username}
            isTyping={contact.isTyping}
          />
        )}
      </div>
      <div className={styles.header__iconsSection}>
        <ToggleThemeBtn />
      </div>
    </header>
  );
};

export default ChatHeader;
