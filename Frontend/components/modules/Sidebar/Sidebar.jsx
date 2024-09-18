import ChatProfilesContainer from "../ChatProfilesContainer/ChatProfilesContainer";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <ChatProfilesContainer />
    </aside>
  );
};

export default Sidebar;
