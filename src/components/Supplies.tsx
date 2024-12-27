import { useState } from "react";
import styles from "../styles/Supplies.module.scss";

const COLORS = [
  { name: "Reds", hue: 0 },
  { name: "Greens", hue: 90 },
  { name: "Blues", hue: 180 },
  { name: "Violets", hue: 270 },
];
const COL = 5;
const ROW = 10;

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

export default Supplies;

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
          key={i}
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
        <NotesRow hue={i * 10 + COLORS[tab].hue} key={i} />
      ))}
    </div>
  );
}

function NotesRow({ hue }: { hue: number }) {
  return (
    <div className={styles.notes__row}>
      {Array.from({ length: ROW }, (_, i) => (
        <EmptyNote lightness={96 - i} hue={hue} key={i} />
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
