import Button from "./Button";
import remove from "../../img/delete.svg";
import styles from "./Card.module.css";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";
import { Fragment, useEffect, useState } from "react";

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
  function flipHandler() {
    console.log("test");
    if (textPointer === "front") setTextPointer("back");
    else setTextPointer("front");
  }

  function deleteHandler() {
    const result = window.confirm(
      `Really delete this card??` +
        "\nOnce deleted, the card cannot be recovered."
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
    <div className={styles.cardContainer}>
      <div className={styles.card} style={{ backgroundColor: bgColor }}>
        {view === "group" && (
          <Fragment>
            <p>{card.front}</p>
            <hr />
            <p>{card.back}</p>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to={`${url}/cards/${card.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <div onClick={deleteHandler}>
                <img
                  src={remove}
                  style={{ height: "30px", cursor: "pointer" }}
                />
              </div>
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
            <div style={{ display: "flex", gap: "5px" }}>
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
    </div>
  );
}

export default Card;
