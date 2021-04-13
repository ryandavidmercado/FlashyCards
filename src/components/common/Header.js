import React from "react";
import styles from "./Header.module.css";
import logo from "../../img/logo.svg";
import { useLocation } from "react-router-dom";
import BreadcrumbAuto from "./BreadcrumbAuto";

const bgColor = "#1f8c7c";

function Header({ setHeaderChange }) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <BreadcrumbAuto setHeaderChange={setHeaderChange} />
      <div className={styles.logoCircle}>
        <img src={logo} />
      </div>
    </header>
  );
}

export default Header;
