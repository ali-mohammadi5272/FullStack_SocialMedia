import React from "react";
import styles from "./notFoundPage.module.scss";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <h2 className={styles.page__title}>404</h2>
      <Link className={styles.page__link} href="/login">
        login
      </Link>
    </main>
  );
};

export default NotFoundPage;
