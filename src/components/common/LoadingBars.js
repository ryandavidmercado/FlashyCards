import ReactLoading from "react-loading";
import AutoCentered from "./AutoCentered";

import styles from "./LoadingBars.module.css";

function LoadingBars() {
  return (
    <AutoCentered>
      <ReactLoading
        type="bars"
        color="rgba(255,255,255,.5)"
        className={styles.loadingComponent}
      />
    </AutoCentered>
  );
}

export default LoadingBars;
