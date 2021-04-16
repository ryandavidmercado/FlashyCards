import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

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
