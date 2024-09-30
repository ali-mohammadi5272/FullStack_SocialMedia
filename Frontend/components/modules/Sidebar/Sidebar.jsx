"use client";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import ChatProfilesContainer from "../ChatProfilesContainer/ChatProfilesContainer";
import styles from "./sidebar.module.scss";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";

const Sidebar = () => {
  const { showSideBar, setShowSideBar } = useContext(AuthContext);

  const showSideBarHandler = () => setShowSideBar((prev) => !prev);
  const offCanvasMenuClick = () => setShowSideBar(false);

  return (
    <>
      <aside
        className={`${styles.aside} ${showSideBar ? styles.aside_active : ""}`}
      >
        <header className={styles.aside__header}>
          <button
            onClick={showSideBarHandler}
            className={styles.aside__hideSideBarIconBtn}
          >
            <FontAwesomeIcon icon="faXmark" />
          </button>
        </header>
        <ChatProfilesContainer />
      </aside>
      {showSideBar && (
        <div
          onClick={offCanvasMenuClick}
          className={`${styles.blurEffect} ${
            showSideBar ? styles.blurEffect_active : ""
          }`}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
