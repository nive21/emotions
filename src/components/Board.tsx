import { useState } from "react";
import styles from "../styles/Board.module.scss";
import Supplies from "./Supplies";
import CalendarBoard from "./CalendarBoard";
import { Footer } from "./Onboarding";

// The board of emotions
function Board({ onClick }: { onClick: () => void }) {
  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleEdit = (color: string) => {
    setSelectedColor(color);
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
    setTab(1);
  };

  return (
    <div className={styles.board__container}>
      <Navbar {...{ tab, setTab, onClick }} />
      <div className={styles.content}>
        {tab === 0 ? (
          <Supplies
            {...{
              editMode,
              selectedColor,
              handleEdit,
              handleClose,
            }}
          />
        ) : (
          <CalendarBoard
            {...{ editMode, selectedColor, handleEdit, handleClose }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Board;

// The top navigation bar of the board
function Navbar({
  tab,
  setTab,
  onClick,
}: {
  tab: number;
  setTab: (tab: number) => void;
  onClick: () => void;
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
        <button onClick={onClick}>?</button>
      </div>
    </div>
  );
}
