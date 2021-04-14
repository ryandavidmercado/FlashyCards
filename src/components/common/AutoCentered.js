import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./AutoCentered.module.css";

//vertically centers content IF content is shorter than viewport
//can optionally only center content on desktop
//honestly the most useful code I've written in this project
function AutoCentered({ children, requireDesktop = false }) {
  const self = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 700px)" });
  const [centerClass, setCenterClass] = useState("");
  const [loaded, setLoaded] = useState(false);
  const visibility = loaded ? "visible" : "hidden";

  useEffect(() => {
    if (self.current.offsetHeight < window.innerHeight)
      setCenterClass(styles.center);
    if (requireDesktop && !isDesktop) setCenterClass("");
    setLoaded(true);
  }, [isDesktop, children]);

  return (
    <div
      ref={self}
      style={{ visibility: `${visibility}` }}
      className={centerClass}
    >
      {children}
    </div>
  );
}

export default AutoCentered;
