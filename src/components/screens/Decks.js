import { Fragment, useEffect, useState } from "react";
import Deck from "../common/Deck";
import NewButton from "../common/NewButton";
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
    <Fragment>
      {decks.map((deck) => (
        <Deck
          deck={deck}
          key={`deck-${deck.id}`}
          view="group"
          updateDecks={updateDecks}
        />
      ))}
      <NewButton type="deck" />
    </Fragment>
  );
}

export default Decks;
