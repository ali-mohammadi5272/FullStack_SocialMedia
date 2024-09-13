import styles from "./chatProfile.module.scss";

const defaultProfileImage = "/images/profiles/avatardefault.webp";

const ChatProfile = ({ username, img, isTyping }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__imageSection}>
        <img
          className={styles.profile__image}
          src={img ? img : defaultProfileImage}
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
