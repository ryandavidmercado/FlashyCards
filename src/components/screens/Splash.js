import styles from "./Splash.module.css";
import logo from "../../img/logo.svg";

function Splash({ inactive }) {
  const quotes = ["Learning in a flash."];

  const getQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };

  if (inactive) return null;
  return (
    <div className={styles.splashContainer}>
      <div className={styles.headerContainer}>
        <h1>FlashyCards</h1>
        <img className={styles.logo} src={logo} />
      </div>
      <p>{getQuote()}</p>
    </div>
  );
}

export default Splash;
