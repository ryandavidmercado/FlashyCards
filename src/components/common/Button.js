import styles from "./Button.module.css";
import ConditionalWrapper from "./ConditionalWrapper";
import { Link } from "react-router-dom";

function Button({
  children,
  variant,
  onClick = null,
  active = true,
  href = "",
}) {
  if (!active) return null;
  return (
    <ConditionalWrapper
      condition={href.length}
      wrapper={(children) => (
        <Link to={href} className={styles.link}>
          {children}
        </Link>
      )}
    >
      <button
        className={`${styles.button} ${styles[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
}

export default Button;
