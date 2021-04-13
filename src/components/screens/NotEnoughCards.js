import styles from "../common/Card.module.css";
import { Fragment } from "react";
import NewButton from "../common/NewButton";

function NotEnoughCards({ cardCount }) {
  return (
    <Fragment>
      <div className={styles.cardContainer} style={{ marginBottom: "10px" }}>
        <div className={styles.card} style={{ backgroundColor: "white" }}>
          <h2>Not enough cards.</h2>
          <hr />
          <p>
            You need at least 3 cards to study. There are {cardCount} cards in
            this deck.
          </p>
        </div>
      </div>
      <NewButton type="card"></NewButton>
    </Fragment>
  );
}

export default NotEnoughCards;
