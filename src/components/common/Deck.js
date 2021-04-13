import styles from "./Deck.module.css";
import Button from "./Button";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import remove from "../../img/delete.svg";
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
  }

  return (
    <div className={styles.deck}>
      <div className={styles.deckTitle}>
        <h2>{name}</h2>
      </div>
      <div className={styles.deckBody}>
        <p>{description}</p>
        <p className={styles.muted}>{cards.length} cards</p>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <Link to={buttonALink}>
              <Button variant="secondary">{buttonAText}</Button>
            </Link>
            <Link to={`/decks/${id}/study`}>
              <Button>{buttonBText}</Button>
            </Link>
          </div>
          <div onClick={deleteHandler}>
            <img src={remove} style={{ height: "30px", cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
