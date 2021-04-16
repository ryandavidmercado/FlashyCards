import logo from "../../img/logo.svg";
import styles from "./Branding.module.css";

function Branding({ visible = true }) {
  if (!visible) return null;
  return (
    <div className={styles.brandingContainer}>
      <h1>FlashyCards</h1>
      <img className={styles.logo} src={logo} alt="FlashyCards logo" />
    </div>
  );
}

export default Branding;
