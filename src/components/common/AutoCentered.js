import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./AutoCentered.module.css";

//vertically centers content IF content is shorter than viewport
//can optionally only center content on desktop
//honestly the most useful code I've written in this project
function AutoCentered({ children, requireDesktop = false }) {
  const self = useRef(null);
  const isDesktop = useMediaQuery({ minWidth: 700 });
  const notRequired = requireDesktop && !isDesktop;
  const [centerIt, setCenterIt] = useState(false);
  const centerClasses = centerIt
    ? [styles.default, styles.center]
    : [styles.default];

  useEffect(() => {
    function handleResize() {
      const header = document.querySelector("header");
      const center = document.querySelector("#center-reference");
      let toCenter = false;

      if (header && center) {
        toCenter =
          center.scrollHeight < window.innerHeight - header.scrollHeight;
      }
      if (toCenter && !notRequired) setCenterIt(true);
      else setCenterIt(false);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [notRequired]);

  return (
    <div ref={self} className={centerClasses.join(" ")} id="center-reference">
      {children}
    </div>
  );
}

export default AutoCentered;
