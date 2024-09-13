import ChatProfile from "../ChatProfile/ChatProfile";
import styles from "./chatHeader.module.scss";

const ChatHeader = () => {
  return (
    <header className={styles.header}>
      <ChatProfile username="Username" />
    </header>
  );
};

export default ChatHeader;
