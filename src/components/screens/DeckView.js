import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NewButton from "../common/NewButton";
import Card from "../common/Card";
import Deck from "../common/Deck";

function DeckView() {
  const { deckId: id } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    updateDeck(id, abortController.signal);

    return () => abortController.abort();
  }, [id]);

  function updateDeck(id, signal) {
    readDeck(id, signal).then(setDeck);
  }

  if (!deck.name) return null;
  return (
    <Fragment>
      <Deck deck={deck} key={`deck-${id}`} view="single" />
      {deck.cards.map((card) => (
        <Card card={card} key={`card-${card.id}`} updateDeck={updateDeck} />
      ))}
      {/* empty spacer div */}
      <div style={{ marginBottom: "15px" }}></div>
      <NewButton type="card" />
    </Fragment>
  );
}

export default DeckView;
