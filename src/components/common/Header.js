import React from "react";
import styles from "./Header.module.css";
import logo from "../../img/logo.svg";
import BreadcrumbAuto from "./BreadcrumbAuto";

function Header({ setHeaderChange }) {
  return (
    <header className={styles.header}>
      <BreadcrumbAuto setHeaderChange={setHeaderChange} />
      <div className={styles.logoCircle}>
        <img src={logo} alt="FlashyCards logo" />
      </div>
    </header>
  );
}

export default Header;
