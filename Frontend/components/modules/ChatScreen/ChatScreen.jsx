import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import styles from "./chatScreen.module.scss";

const ChatScreen = ({ data = [], userId = "" }) => {
  return (
    <section className={styles.chatScreen}>
      <ChatHeader />
      <section className={styles.chatSection}>
        {data.map((message) => (
          <Message
            own={userId === message.creatorId}
            key={message._id}
            {...message}
          />
        ))}
      </section>
    </section>
  );
};

export default ChatScreen;
