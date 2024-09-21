"use client";
import styles from "./chatProfilesContainer.module.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ChatProfile from "../ChatProfile/ChatProfile";

const ChatProfilesContainer = () => {
  const { user, users, setContact, namespaceSocket } = useContext(AuthContext);

  const joinRoom = (contact) => {
    namespaceSocket.emit("joinRoom", [user._id, contact._id]);
  };

  const chatProfileClickHandler = (userInfo) => {
    setContact({ ...userInfo, isTyping: false });
    joinRoom(userInfo);
  };

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
