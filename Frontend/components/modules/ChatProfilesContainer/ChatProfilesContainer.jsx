"use client";
import styles from "./chatProfilesContainer.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ChatProfile from "../ChatProfile/ChatProfile";

const ChatProfilesContainer = () => {
  const { user, users, setContact } = useContext(AuthContext);

  return (
    <section className={styles.chatProfilesContainer}>
      {users.map(
        (userInfo) =>
          user._id !== userInfo._id && (
            <ChatProfile
              key={userInfo._id}
              onClick={() => setContact({ ...userInfo, isTyping: false })}
              imgSectionClassName={styles.chatProfilesContainer__imgSection}
              username={userInfo.username}
            />
          )
      )}
    </section>
  );
};

export default ChatProfilesContainer;
