import styles from "../common/Card.module.css";

import Button from "../common/Button";
import AutoCentered from "../common/AutoCentered";

import { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { createCard, updateCard, readCard } from "../../utils/api";
import { autoResizeBox } from "../../utils/auto-resize";

function EditCard() {
  const history = useHistory();
  const params = useParams();
  // references to our textboxes, so we can autoResize them later
  const frontContainer = useRef(null);
  const backContainer = useRef(null);
  const linkToParentDeck = `/decks/${params.deckId}`;

  const [card, setCard] = useState({});
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({
    front: "",
    back: "",
  });

  //if we're editing a card, load that card and set our state to edit
  useEffect(() => {
    const abortController = new AbortController();

    if (params.cardId) {
      setEdit(true);
      readCard(params.cardId, abortController.signal, false).then(setCard);
    }

    return () => abortController.abort();
  }, []);

  //after loading a card, fill the form with said card
  useEffect(() => {
    setFormState({
      front: card.front,
      back: card.back,
    });
  }, [card]);

  //call autoResizeBox whenever the textboxes change
  useEffect(() => autoResizeBox(frontContainer), [formState.front]);
  useEffect(() => autoResizeBox(backContainer), [formState.back]);

  function changeHandler(target) {
    setFormState((formState) => ({
      ...formState,
      [target.name]: target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const front = formData.get("front");
    const back = formData.get("back");

    /*create a card if we're not editing one; otherwise, update the card.
    then go to our parent deck's page.*/
    if (!edit) {
      createCard(params.deckId, {
        front,
        back,
        deckId: Number(params.deckId),
      }).then(() => history.push(linkToParentDeck));
    } else {
      updateCard({
        front,
        back,
        id: card.id,
        deckId: Number(params.deckId),
      }).then(() => history.push(linkToParentDeck));
    }
  }

  return (
    <AutoCentered>
      <form onSubmit={submitHandler}>
        <div className={styles.cardContainer}>
          <div className={styles.card} style={{ backgroundColor: "white" }}>
            <textarea
              ref={frontContainer}
              type="text"
              placeholder="Front"
              value={formState.front}
              name="front"
              onChange={({ target }) => changeHandler(target)}
              autoFocus={true}
            />
            <hr />
            <textarea
              ref={backContainer}
              placeholder="Back"
              value={formState.back}
              name="back"
              onChange={({ target }) => changeHandler(target)}
            />
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button variant="secondary" href={linkToParentDeck}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AutoCentered>
  );
}

export default EditCard;
