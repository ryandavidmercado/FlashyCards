import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import UnderHeader from "./components/common/UnderHeader";
import DeckView from "./components/screens/DeckView";
import Splash from "./components/screens/Splash";
import Decks from "./components/screens/Decks";
import NotFound from "./components/screens/NotFound";
import EditDeck from "./components/screens/EditDeck";
import EditCard from "./components/screens/EditCard";
import DeckStudy from "./components/screens/DeckStudy";

function App() {
  /* toggles when the header renders so that
  UnderHeader can adjust its padding appropriately */
  const [headerChange, setHeaderChange] = useState(0);

  return (
    <div className="app-routes">
      <Header setHeaderChange={setHeaderChange} />
      <UnderHeader headerChange={headerChange}>
        <Switch>
          <Route exact={true} path="/">
            {/* <Splash inactive={loaded.loaded && loaded.minElapsed} /> */}
            <Decks />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <EditCard view="new" />
          </Route>
          <Route path="/decks/new">
            <EditDeck view="new" />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </UnderHeader>
    </div>
  );
}

export default App;
