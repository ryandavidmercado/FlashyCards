import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "../common/Card";
import NotEnoughCards from "./NotEnoughCards";

function DeckStudy() {
  const params = useParams();
  const [deck, setDeck] = useState({});
  const [cardPointer, setCardPointer] = useState(0);
  const [hasFlipped, setHasFlipped] = useState(false);
  const last = deck.cards ? cardPointer === deck.cards.length - 1 : false;
  const pos = deck.cards ? [cardPointer + 1, deck.cards.length] : [];
  const history = useHistory();

  //fetch our card on load
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(params.deckId, abortController.signal).then(setDeck);
    return () => abortController.abort();
  }, []);

  //prompt for a restart when the final card's been flipped
  useEffect(() => {
    if (hasFlipped && last) {
      const result = window.confirm(
        `Restart session?` + "\nClick 'Cancel' to return home instead."
      );
      if (result) {
        setHasFlipped(false);
        setCardPointer(0);
      } else {
        history.push("/");
      }
    }
  }, [hasFlipped, last]);

  function nextHandler() {
    setHasFlipped(false);
    setCardPointer((cardPointer) => cardPointer + 1);
  }

  if (!deck.id) return null;
  if (deck.id && deck.cards.length < 3)
    return <NotEnoughCards cardCount={deck.cards.length} />;
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Card
        card={deck.cards[cardPointer]}
        view="single"
        nextHandler={nextHandler}
        last={last}
        pos={pos}
        hasFlipped={hasFlipped}
        setHasFlipped={setHasFlipped}
        key={`study-card-${deck.cards[cardPointer].id}`}
      />
    </div>
  );
}

export default DeckStudy;
