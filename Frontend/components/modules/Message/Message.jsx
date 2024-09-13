import styles from "./message.module.scss";

const Message = ({ body, createdAt, own }) => {
  return (
    <div
      className={`${styles.message} ${
        own ? styles.message_own : styles.message_notOwn
      }`}
    >
      <div
        className={`${styles.message__body} ${
          own ? styles.message__body_own : styles.message__body_notOwn
        }`}
      >
        <p className={styles.message__text}>{body}</p>
        <div
          className={`${styles.message__time} ${
            own ? styles.message__time_own : styles.message__time_notOwn
          }`}
        >
          {new Date(createdAt).toLocaleTimeString("ir-fa")}
        </div>
      </div>
    </div>
  );
};

export default Message;
