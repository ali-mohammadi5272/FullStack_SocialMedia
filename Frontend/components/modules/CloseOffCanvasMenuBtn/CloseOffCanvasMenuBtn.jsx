"use client";
import styles from "./closeOffCanvasMenuBtn.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";

const CloseOffCanvasMenuBtn = ({ className }) => {
  const { setShowSideBar } = useContext(AuthContext);

  const showSideBarHandler = () => setShowSideBar(false);

  return (
    <button
      onClick={showSideBarHandler}
      className={`${styles.btn} ${className ? className : ""}`}
    >
      <FontAwesomeIcon icon="faXmark" />
    </button>
  );
};

export default CloseOffCanvasMenuBtn;
