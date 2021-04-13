import styles from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";

function Breadcrumb({ name, link, active = false }) {
  if (active) return <div className={styles.breadcrumb}>{name}</div>;
  else
    return (
      <Link to={link} className={styles.breadcrumb}>
        {name}
      </Link>
    );
}

export default Breadcrumb;
