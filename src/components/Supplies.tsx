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

export type EditHandler = (color: string) => void;

// The supplies tab of the board
function Supplies({ handleEdit }: { handleEdit: EditHandler }) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <ColorsTab {...{ tab, setTab }} />
      <AllNotes {...{ tab, onEdit: handleEdit }} />
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

function AllNotes({ tab, onEdit }: { tab: number; onEdit: EditHandler }) {
  return (
    <div className={styles.colors__container}>
      <h2 className={styles.title}>Pick a color based on your emotion.</h2>
      <div className={styles.all_colors}>
        {Array.from({ length: COL }, (_, i) => (
          <NotesRow hue={i * 10 + COLORS[tab].hue} key={i} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

function NotesRow({ hue, onEdit }: { hue: number; onEdit: EditHandler }) {
  return (
    <div
      className={styles.notes__row}
      style={{
        zIndex: 360 - hue / 10,
      }}
    >
      {Array.from({ length: ROW }, (_, i) => (
        <EmptyNote lightness={96 - i} hue={hue} key={i} onEdit={onEdit} />
      ))}
    </div>
  );
}

function EmptyNote({
  lightness,
  hue,
  onEdit,
}: {
  lightness: number;
  hue: number;
  onEdit: EditHandler;
}) {
  const color = `hsl(${hue}, 74%, ${lightness}%)`;
  return (
    <div
      className={styles.note}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onEdit(color)}
    ></div>
  );
}
