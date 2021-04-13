import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "./Breadcrumb";

function BreadcrumbAuto({ setHeaderChange }) {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);

  async function breadCrumber() {
    const rawCrumbs = location.pathname.split("/");
    const outputCrumbs =
      rawCrumbs.length === 2
        ? [<Breadcrumb name="Decks" link="/" active={true} key="bc-decks" />]
        : [<Breadcrumb name="Decks" link="/" key="bc-decks" />];

    let id;
    let deck;
    let deckURL;

    for (let i = 0; i < rawCrumbs.length; i++) {
      let active = rawCrumbs.length - 1 === i;
      const crumb = rawCrumbs[i];
      const nextCrumb = rawCrumbs[i + 1];
      const lastCrumb = rawCrumbs[i - 1];

      switch (crumb) {
        case "new":
          if (lastCrumb === "cards") {
            outputCrumbs.push(
              <Breadcrumb
                name="Add Card"
                link={`/decks/${rawCrumbs[i - 2]}/cards/new`}
                active={active}
                key="bc-create-card"
              />
            );
          }
          break;
        case "decks":
          if (nextCrumb === "new") {
            outputCrumbs.push(
              <Breadcrumb
                name="Create Deck"
                link={"/decks/new"}
                active={true}
                key="bc-create-deck"
              />
            );
            break;
          }
          const abortController = new AbortController();

          id = nextCrumb;
          active = rawCrumbs.length - 1 === i + 1;
          deckURL = `/decks/${id}`;
          deck = await readDeck(id, abortController.signal, false);

          outputCrumbs.push(
            <Breadcrumb
              name={deck.name}
              link={deckURL}
              active={active}
              key={`bc-${deck.name}`}
            />
          );
          break;
        case "edit":
          switch (rawCrumbs[i - 2]) {
            case "decks":
              outputCrumbs.push(
                <Breadcrumb
                  name="Edit Deck"
                  link={`${deckURL}/edit`}
                  active={active}
                  key="bc-edit-deck"
                />
              );
              break;
            case "cards":
              const cardId = lastCrumb;
              outputCrumbs.push(
                <Breadcrumb
                  name={`Edit Card ${cardId}`}
                  link={`${deckURL}/edit`}
                  active={active}
                  key="bc-edit-card"
                />
              );
              break;
            default:
              break;
          }
          break;
        case "study":
          outputCrumbs.push(
            <Breadcrumb
              name="Study"
              link={`${deckURL}/study`}
              active={active}
              key="bc-study"
            />
          );
        default:
          break;
      }
    }
    return outputCrumbs;
  }

  useEffect(() => {
    async function callBreadCrumber() {
      const crumbs = await breadCrumber();
      setCrumbs(crumbs);
    }
    callBreadCrumber();
  }, [location]);

  /*modify app's headerChange state after render
  so that UnderHeader can apply padding */
  useEffect(() => {
    setHeaderChange((headerChange) => !headerChange);
  }, [crumbs]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
      {crumbs}
    </div>
  );
}

export default BreadcrumbAuto;
