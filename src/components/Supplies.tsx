import { useState } from "react";
import styles from "../styles/Supplies.module.scss";
import Sketchpad from "./Sketchpad";

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
  const [editMode, setEditMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState({ hue: 0, lightness: 0 });

  const handleEdit = (hue: number, lightness: number) => {
    setSelectedColor({ hue, lightness });
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  return (
    <>
      {editMode && (
        <Sketchpad onClose={handleClose} selectedColor={selectedColor} />
      )}
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

type EditHandler = (hue: number, lightness: number) => void;

function AllNotes({ tab, onEdit }: { tab: number; onEdit: EditHandler }) {
  return (
    <div className={styles.supplies__container}>
      {Array.from({ length: COL }, (_, i) => (
        <NotesRow hue={i * 10 + COLORS[tab].hue} key={i} onEdit={onEdit} />
      ))}
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
  return (
    <div
      className={styles.note}
      style={{
        backgroundColor: `hsl(${hue}, 74%, ${lightness}%)`,
      }}
      onClick={() => onEdit(hue, lightness)}
    ></div>
  );
}
