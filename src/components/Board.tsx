import { useState } from "react";
import styles from "../styles/Board.module.scss";

const COLORS = [
  { name: "Reds", hue: 0 },
  { name: "Greens", hue: 90 },
  { name: "Blues", hue: 180 },
  { name: "Voilets", hue: 270 },
];
const COL = 5;
const ROW = 10;

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
  const [tab, setTab] = useState(0);
  return (
    <>
      <ColorsTab {...{ tab, setTab }} />
      <AllNotes {...{ tab }} />
    </>
  );
}

function ColorsTab({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (tab: number) => void;
}) {
  return (
    <div className={styles.colors__tab}>
      {COLORS.map((color, i) => (
        <button
          className={`${styles.colors__title} ${
            tab === i ? styles.active : ""
          }`}
          onClick={() => setTab(i)}
        >
          {color.name}
        </button>
      ))}
    </div>
  );
}

function AllNotes({ tab }: { tab: number }) {
  return (
    <div className={styles.supplies__container}>
      {Array.from({ length: COL }, (_, i) => (
        <NotesRow hue={i * 10 + COLORS[tab].hue} />
      ))}
    </div>
  );
}

function NotesRow({ hue }: { hue: number }) {
  return (
    <div className={styles.notes__row}>
      {Array.from({ length: ROW }, (_, i) => (
        <EmptyNote lightness={96 - i} hue={hue} />
      ))}
    </div>
  );
}

function EmptyNote({ lightness, hue }: { lightness: number; hue: number }) {
  return (
    <div
      className={styles.note}
      style={{
        backgroundColor: `hsl(${hue}, 74%, ${lightness}%)`,
      }}
    ></div>
  );
}

// The calendar tab of the board
function Calendar() {
  return <>calendar</>;
}
