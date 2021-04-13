import styles from "./NewButton.module.css";
import add from "../../img/add.svg";
import { Link, useParams } from "react-router-dom";

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
  }

  return (
    <div className={styles.buttonContainer}>
      <Link to={link}>
        <div className={styles.button}>
          <img src={add} width="35px" height="35px"></img>
          <h2>{text}</h2>
        </div>
      </Link>
    </div>
  );
}

export default NewButton;
