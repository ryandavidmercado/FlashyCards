import BreadcrumbAuto from "./BreadcrumbAuto";
import logo from "../../img/logo.svg";

import styles from "./Header.module.css";

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
