import { useEffect, useState } from "react";

function UnderHeader({ children, headerChange }) {
  const [paddingTop, setPaddingTop] = useState(0);

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
