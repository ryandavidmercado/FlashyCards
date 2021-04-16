import { useMediaQuery } from "react-responsive";
import styles from "./AutoCentered.module.css";
import classNames from "../../utils/class-names";

//vertically centers content IF content is shorter than viewport
//can optionally only center content on desktop
//honestly the most useful code I've written in this project
function AutoCentered({ children, requireDesktop = false }) {
  const isDesktop = useMediaQuery({ minWidth: 700 });
  const notRequired = requireDesktop && !isDesktop;

  return (
    <div
      className={classNames({
        [styles.default]: true,
        [styles.center]: !notRequired,
      })}
    >
      {children}
    </div>
  );
}

export default AutoCentered;
