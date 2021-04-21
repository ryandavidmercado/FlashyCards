import { Fragment, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

import ConditionalWrapper from "./ConditionalWrapper";
import DeleteButton from "./DeleteButton";
import Button from "./Button";

import styles from "./Card.module.css";

function Card({
  card,
  view = "group",
  updateDeck,
  last = false,
  hasFlipped,
  setHasFlipped,
  nextHandler,
  pos,
}) {
  const [textPointer, setTextPointer] = useState("front");
  const { url } = useRouteMatch();

  const params = useParams();

  function deleteHandler() {
    const result = window.confirm(
      "Really delete this card?\nOnce deleted, it cannot be recovered."
    );
    if (result) {
      const abortController = new AbortController();
      deleteCard(card.id, abortController.signal).then(() => {
        updateDeck(params.deckId, abortController.signal);
      });
    }
  }

  function flipHandler() {
    setTextPointer((textPointer) => {
      if (textPointer === "front") return "back";
      else return "front";
    });
    setHasFlipped(true);
  }

  let bgColor = hasFlipped ? "rgb(220,255,250)" : "white";

  return (
    <ConditionalWrapper
      condition={view === "single"}
      wrapper={(children) => (
        <div className={styles.cardContainer}>{children}</div>
      )}
    >
      <div className={styles.card} style={{ backgroundColor: bgColor }}>
        {view === "group" && (
          <Fragment>
            <p>{card.front}</p>
            <hr />
            <p>{card.back}</p>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button href={`${url}/cards/${card.id}/edit`}>Edit</Button>
              <DeleteButton onClick={deleteHandler} type="Card" />
            </div>
          </Fragment>
        )}
        {view === "single" && (
          <Fragment>
            <h2>
              Card {pos[0]} of {pos[1]}
            </h2>
            <hr />
            <p>{card[textPointer]}</p>
            <hr />
            <div className={styles.buttons}>
              <Button variant="secondary" onClick={flipHandler}>
                Flip
              </Button>
              <Button active={hasFlipped && !last} onClick={nextHandler}>
                Next
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </ConditionalWrapper>
  );
}

export default Card;
