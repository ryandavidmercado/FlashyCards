import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import useLoad from "../../utils/use-load";
import styles from "./DeckView.module.css";
import NewButton from "../common/NewButton";
import Card from "../common/Card";
import Deck from "../common/Deck";
import AutoCentered from "../common/AutoCentered";
import LoadingBars from "../common/LoadingBars";

function DeckView() {
  const { deckId: id } = useParams();
  const [deck, setDeck] = useState({});
  const loaded = useLoad(deck.name);

  useEffect(() => {
    const abortController = new AbortController();
    updateDeck(id, abortController.signal);

    return () => abortController.abort();
  }, [id]);

  function updateDeck(id, signal) {
    readDeck(id, signal).then(setDeck);
  }

  if (!loaded) return <LoadingBars />;
  return (
    <AutoCentered requireDesktop={true}>
      <div className={styles.screenContainer}>
        <Deck deck={deck} key={`deck-${id}`} view="single" />
        <div className={styles.cardsContainer}>
          {deck.cards.map((card) => (
            <Card card={card} key={`card-${card.id}`} updateDeck={updateDeck} />
          ))}
          {/* empty spacer div */}
        </div>
        <NewButton type="card" />
      </div>
    </AutoCentered>
  );
}

export default DeckView;
