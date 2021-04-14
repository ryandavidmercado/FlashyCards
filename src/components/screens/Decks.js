import { Fragment, useEffect, useState } from "react";
import styles from "./Decks.module.css";
import Deck from "../common/Deck";
import NewButton from "../common/NewButton";
import AutoCentered from "../common/AutoCentered";
import { listDecks } from "../../utils/api";

function Decks() {
  const [decks, setDecks] = useState([]);

  function updateDecks(signal) {
    listDecks(signal).then(setDecks);
  }
  useEffect(() => {
    const abortController = new AbortController();
    updateDecks(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (!decks.length) return null;
  return (
    <AutoCentered requireDesktop={true}>
      <div className={styles.decksContainer}>
        {decks.map((deck) => (
          <Deck
            deck={deck}
            key={`deck-${deck.id}`}
            view="group"
            updateDecks={updateDecks}
          />
        ))}
      </div>
      <NewButton type="deck" />
    </AutoCentered>
  );
}

export default Decks;
