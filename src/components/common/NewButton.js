import styles from "./NewButton.module.css";
import add from "../../img/add.svg";
import { Link, useParams } from "react-router-dom";
import classNames from "../../utils/class-names";

function NewButton({ type }) {
  const params = useParams();

  let link, text;
  switch (type) {
    case "deck":
      link = "/decks/new";
      text = "Create Deck";
      break;
    case "card":
      link = `/decks/${params.deckId}/cards/new`;
      text = "Add Card";
      break;
    default:
      break;
  }

  return (
    <div
      className={classNames({
        [styles.buttonContainer]: true,
        [styles.cardButton]: type === "card",
      })}
    >
      <Link to={link}>
        <div className={styles.button}>
          <img src={add} width="35px" height="35px" alt=""></img>
          <h2>{text}</h2>
        </div>
      </Link>
    </div>
  );
}

export default NewButton;
