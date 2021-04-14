import styles from "../common/Deck.module.css";

import Button from "../common/Button";
import AutoCentered from "../common/AutoCentered";

import { useState, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { createDeck, readDeck, updateDeck } from "../../utils/api";
import { autoResizeBox } from "../../utils/auto-resize";

function EditDeck() {
  const history = useHistory();
  const params = useParams();
  // references to our textboxes, so we can autoResize them later
  const descContainer = useRef(null);

  const [deck, setDeck] = useState({});
  const [edit, setEdit] = useState(false);
  const [cancelLink, setCancelLink] = useState("/");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  //if we're editing a deck, load that deck and set our state to edit
  useEffect(() => {
    const abortController = new AbortController();

    if (params.deckId) {
      setEdit(true);
      readDeck(params.deckId, abortController.signal, false).then(setDeck);
    }

    return () => abortController.abort();
  }, []);

  //after loading a deck, fill the form with said deck
  useEffect(() => {
    setFormState({
      name: deck.name,
      description: deck.description,
    });
  }, [deck]);

  //call autoResizeBox whenever the description changes
  useEffect(() => autoResizeBox(descContainer), [formState.description]);

  function changeHandler(target) {
    setFormState((formState) => ({
      ...formState,
      [target.name]: target.value,
    }));
  }

  //modify our cancel link if we're editing a deck
  useEffect(() => {
    if (edit) {
      setCancelLink(`/decks/${params.deckId}`);
    }
  }, [edit]);

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    /*create a deck if we're not editing one; otherwise, update the deck. 
    then go to the appropriate page.*/
    if (!edit) {
      createDeck({ name, description }).then(() => history.push("/"));
    } else {
      updateDeck({ name, description, id: deck.id }).then(() =>
        history.push(cancelLink)
      );
    }
  }

  return (
    <AutoCentered requireDesktop={true}>
      <div className={styles.screenContainer}>
        <form onSubmit={submitHandler}>
          <div className={[styles.deck, styles.deckSingle].join(" ")}>
            <div className={styles.deckTitle}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formState.name}
                onChange={({ target }) => changeHandler(target)}
                autoFocus={true}
              />
            </div>
            <div className={styles.deckBody}>
              <textarea
                ref={descContainer}
                placeholder="Description"
                value={formState.description}
                name="description"
                onChange={({ target }) => changeHandler(target)}
              />
            </div>
            <hr />
            <div className={styles.deckFooter}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Link to={cancelLink}>
                  <Button variant="secondary">Cancel</Button>
                </Link>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AutoCentered>
  );
}

export default EditDeck;
