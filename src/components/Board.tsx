import { useState } from "react";
import styles from "../styles/Board.module.scss";

// The board of emotions
function Board() {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.board__container}>
      <Navbar {...{ tab, setTab }} />
      <div className={styles.content}>
        {tab === 0 ? <Supplies /> : <Calendar />}
      </div>
    </div>
  );
}

export default Board;

// The top navigation bar of the board
function Navbar({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (tab: number) => void;
}) {
  const handleClick = (tab: number) => {
    setTab(tab);
  };

  return (
    <div className={styles.navbar__container}>
      <h1>My board of emotions</h1>
      <div className={styles.navbar__tabs}>
        <button
          onClick={() => handleClick(0)}
          className={tab === 0 ? styles.active : ""}
        >
          Supplies
        </button>
        <div className={styles.divider}></div>
        <button
          onClick={() => handleClick(1)}
          className={tab === 1 ? styles.active : ""}
        >
          Calendar
        </button>
      </div>
      <div className={styles.navbar__help}>
        <button>?</button>
      </div>
    </div>
  );
}

// The supplies tab of the board
function Supplies() {
  return <>supplies</>;
}

// The calendar tab of the board
function Calendar() {
  return <>calendar</>;
}
