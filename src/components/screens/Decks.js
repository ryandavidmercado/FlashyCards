import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { listDecks } from "../../utils/api";
import useLoad from "../../utils/use-load";

import Branding from "../common/Branding";
import Deck from "../common/Deck";
import NewButton from "../common/NewButton";
import AutoCentered from "../common/AutoCentered";
import LoadingBars from "../common/LoadingBars";

import styles from "./Decks.module.css";

function Decks() {
  const [decks, setDecks] = useState([]);
  const showBranding = useMediaQuery({ minWidth: 700 });
  const loaded = useLoad(decks.length, 1000);

  function updateDecks(signal) {
    listDecks(signal).then(setDecks);
  }
  useEffect(() => {
    const abortController = new AbortController();
    updateDecks(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (!loaded)
    return (
      <AutoCentered>
        <Branding />
        <LoadingBars />
      </AutoCentered>
    );

  return (
    <AutoCentered requireDesktop={true}>
      <Branding visible={showBranding} />
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
