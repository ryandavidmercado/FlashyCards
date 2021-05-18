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
  nextHandler,
  previousHandler,
  finishHandler,
  pos,
}) {
  const [textPointer, setTextPointer] = useState("front");
  const [hasFlipped, setHasFlipped] = useState(false);
  const { url } = useRouteMatch();

  const params = useParams();

  let first;
  let last;
  if (view === "single") {
    first = pos[0] === 1;
    last = pos[0] === pos[1];
  }

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
              <div className={[styles.subButtons, styles.subLeft].join(" ")}>
                <Button
                  active={!first}
                  onClick={previousHandler}
                  variant="secondary"
                >
                  Back
                </Button>
              </div>
              <div className={styles.subButtons}>
                <Button onClick={flipHandler}>Flip</Button>
              </div>
              <div className={[styles.subButtons, styles.subRight].join(" ")}>
                <Button
                  variant="secondary"
                  active={hasFlipped}
                  onClick={last ? finishHandler : nextHandler}
                >
                  {last ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </ConditionalWrapper>
  );
}

export default Card;
