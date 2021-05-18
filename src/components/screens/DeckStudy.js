import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck } from "../../utils/api";
import useLoad from "../../utils/use-load";

import Card from "../common/Card";
import NotEnoughCards from "./NotEnoughCards";
import AutoCentered from "../common/AutoCentered";
import LoadingBars from "../common/LoadingBars";

function DeckStudy() {
  const params = useParams();
  const [deck, setDeck] = useState({});
  const [cardPointer, setCardPointer] = useState(0);

  const pos = deck.cards ? [cardPointer + 1, deck.cards.length] : [];

  const history = useHistory();
  const loaded = useLoad(deck.id);

  //fetch our card on load
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(params.deckId, abortController.signal).then(setDeck);
    return () => abortController.abort();
  }, []);

  function nextHandler() {
    setCardPointer((cardPointer) => cardPointer + 1);
  }

  function previousHandler() {
    setCardPointer((cardPointer) => cardPointer - 1);
  }

  function finishHandler() {
    history.push(`/decks/${params.deckId}`);
  }

  if (!loaded) return <LoadingBars />;
  if (deck.id && deck.cards.length < 3)
    return (
      <AutoCentered>
        <NotEnoughCards cardCount={deck.cards.length} />
      </AutoCentered>
    );
  return (
    <AutoCentered>
      <Card
        card={deck.cards[cardPointer]}
        view="single"
        nextHandler={nextHandler}
        previousHandler={previousHandler}
        finishHandler={finishHandler}
        pos={pos}
        key={`study-card-${deck.cards[cardPointer].id}`}
      />
    </AutoCentered>
  );
}

export default DeckStudy;
