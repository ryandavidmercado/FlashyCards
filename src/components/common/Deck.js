import styles from "./Deck.module.css";
import Button from "./Button";
import DeleteButton from "./DeleteButton";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function Card({
  deck: { name, description, id, cards } = {},
  updateDecks,
  view = "group",
}) {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  function deleteHandler() {
    const result = window.confirm(
      `Really delete '${name}'?` +
        "\nOnce deleted, this deck cannot be recovered."
    );
    if (result) {
      const abortController = new AbortController();
      const { signal } = abortController;
      deleteDeck(id, signal).then(() => {
        //manually trigger a decks update if we're home. If not, go home.
        if (location.pathname === "/") {
          updateDecks(signal);
        } else {
          history.push("/");
        }
      });
    }
  }

  let buttonAText, buttonALink, buttonBText;
  switch (view) {
    case "group":
      buttonAText = "View";
      buttonALink = `/decks/${id}`;
      buttonBText = "Study";
      break;
    case "single":
      buttonAText = "Edit";
      buttonALink = `${url}/edit`;
      buttonBText = "Study";
      break;
    default:
      break;
  }

  return (
    //give the deck the deckSingle class if we're viewing this alone, but don't otherwise
    <div
      className={
        (view === "single" ? styles.deckSingle : "") + " " + styles.deck
      }
    >
      <div className={styles.deckTitle}>
        <h2>{name}</h2>
      </div>
      <div className={styles.deckBody}>
        <p>{description}</p>
        <p className={styles.muted}>{cards.length} cards</p>
      </div>
      <hr />
      <div className={styles.deckFooter}>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button variant="secondary" href={buttonALink}>
            {buttonAText}
          </Button>
          <Button href={`/decks/${id}/study`}>{buttonBText}</Button>
        </div>
        <DeleteButton onClick={deleteHandler} type="Deck" />
      </div>
    </div>
  );
}

export default Card;
