"use client";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";
import styles from "./chatMessageInput.module.scss";

const ChatMessageInput = () => {
  const { user, contact, namespaceSocket } = useContext(AuthContext);
  const [formData, setFormData] = useState({ message: "" });
  const timeOutRef = useRef();

  const sendUserTypingStart = () => {
    namespaceSocket.emit("userTypingStart", {
      user,
      isTyping: true,
      rooms: [user._id, contact._id],
    });
  };

  const sendUserTypingEnd = () => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      namespaceSocket.emit("userTypingEnd", {
        user,
        isTyping: false,
        rooms: [user._id, contact._id],
      });
      console.log("test");
    }, 2000);
  };

  const userTypingStatusHandler = () => {
    sendUserTypingStart();
    sendUserTypingEnd();
  };

  const messageInputChangeHandler = (e) => {
    setFormData({
      message: e.target.value,
    });
    userTypingStatusHandler();
  };

  const resetForm = () => setFormData({ message: "" });

  const sendMessageToServer = () => {
    namespaceSocket.emit("submitChatMessage", {
      creatorId: user._id,
      receiverId: contact._id,
      message: formData.message,
      rooms: [user._id, contact._id],
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    sendMessageToServer();
    resetForm();
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler} action="">
      <label className={styles.form__label} htmlFor="chatMessageInput">
        <input
          className={styles.form__input}
          type="text"
          placeholder="Message"
          value={formData.message}
          onChange={messageInputChangeHandler}
        />
        <button className={styles.form__btn}>
          <FontAwesomeIcon icon="faPaperPlane" />
        </button>
      </label>
    </form>
  );
};

export default ChatMessageInput;
