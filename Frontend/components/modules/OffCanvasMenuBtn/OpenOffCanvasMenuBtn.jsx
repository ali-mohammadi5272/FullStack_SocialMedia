"use client";
import styles from "./openOffCanvasMenuBtn.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";

const OpenOffCanvasMenuBtn = ({ className }) => {
  const { setShowSideBar } = useContext(AuthContext);

  const showSideBarHandler = () => setShowSideBar((prev) => !prev);

  return (
    <button
      onClick={showSideBarHandler}
      className={`${styles.btn} ${className ? className : ""}`}
    >
      <FontAwesomeIcon icon="faBars" />
    </button>
  );
};

export default OpenOffCanvasMenuBtn;
