import styles from "./Button.module.css";

function Button({ children, variant, onClick = null, active = true }) {
  if (!active) return null;
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
