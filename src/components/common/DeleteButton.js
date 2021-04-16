import remove from "../../img/delete.svg";
import styles from "./DeleteButton.module.css";

function DeleteButton({ onClick, type }) {
  return (
    <div onClick={onClick}>
      <img src={remove} className={styles.delete} alt={`Delete ${type}`} />
    </div>
  );
}

export default DeleteButton;
