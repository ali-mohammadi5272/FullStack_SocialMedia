"use client";
import styles from "./message.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const Message = ({ body, createdAt, creatorId }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${styles.message} ${
        user._id === creatorId ? styles.message_own : styles.message_notOwn
      }`}
    >
      <div
        className={`${styles.message__body} ${
          user._id === creatorId
            ? styles.message__body_own
            : styles.message__body_notOwn
        }`}
      >
        <p className={styles.message__text}>{body}</p>
        <div
          className={`${styles.message__time} ${
            user._id === creatorId
              ? styles.message__time_own
              : styles.message__time_notOwn
          }`}
        >
          {new Date(createdAt).toLocaleTimeString("fa-IR")}
        </div>
      </div>
    </div>
  );
};

export default Message;
