import styles from "./chatProfile.module.scss";

const ChatProfile = ({ username, isTyping }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__imageSection}>
        <img
          className={styles.profile__image}
          src="http://localhost:3000/rooms/images/1725455267161-e443ac81-fb04-4203-bb7b-a2814e2aa359236344612103.png"
          alt=""
          crossOrigin="anonymous"
        />
      </div>
      <div className={styles.profile__infos}>
        <p className={styles.profile__username}>{username}</p>
        <p className={styles.profile__lastSeen}>
          {isTyping ? `${username} is typing...` : "last seen recently"}
        </p>
      </div>
    </div>
  );
};

export default ChatProfile;
