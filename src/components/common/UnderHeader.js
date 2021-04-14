import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function UnderHeader({ children, headerChange }) {
  const [paddingTop, setPaddingTop] = useState(0);
  const location = useLocation();

  //set appropriate padding when header renders.
  useEffect(() => {
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;
    setPaddingTop(headerHeight);
  }, [headerChange]);

  return (
    <section
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: "15px",
        height: "1px",
        minHeight: "100%",
      }}
      id="under-header"
    >
      {children}
    </section>
  );
}

export default UnderHeader;
