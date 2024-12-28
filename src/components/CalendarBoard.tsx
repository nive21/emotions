import Calendar from "react-calendar";
import styles from "../styles/CalendarBoard.module.scss";
import "../styles/CalendarBoard.scss";
import Sketchpad from "./Sketchpad";
import { EditHandler } from "./Supplies";
import { useState } from "react";

type NoteType = {
  color: string;
  sketch: string;
};

export type NotesType = {
  [date: string]: {
    [timestamp: string]: NoteType;
  };
};

// The calendar tab of the board
function CalendarBoard({
  editMode,
  selectedColor,
  handleEdit,
  handleClose,
}: {
  editMode: boolean;
  selectedColor: string;
  handleEdit: EditHandler;
  handleClose: () => void;
}) {
  const notes: NotesType = JSON.parse(localStorage.getItem("notes") || "{}");
  const [selectedTimestamp, setSelectedTimestamp] = useState(Date.now());

  // Customize the calendar tiles to display a circle with color
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey: keyof NotesType = date.toLocaleDateString();
      if (notes[dateKey]) {
        return (
          <div className={styles.note__indicators}>
            {Object.entries(notes[dateKey]).map(([timestamp, note], index) => (
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                key={`${dateKey}-${index}`}
                style={{
                  left: `${index * 26}px`,
                }}
                onClick={() => {
                  handleEdit(note.color);
                  setSelectedTimestamp(Number(timestamp));
                }}
              >
                <circle cx="10" cy="10" r="10" fill={note.color} />
              </svg>
            ))}
          </div>
        );
      }
    }
    // If no notes
    return null;
  };

  return (
    <>
      {editMode && (
        <Sketchpad
          onClose={handleClose}
          selectedColor={selectedColor}
          timestamp={selectedTimestamp}
        />
      )}
      <div className={styles.calendar__container}>
        <Calendar maxDate={new Date()} tileContent={tileContent} />
      </div>
    </>
  );
}

export default CalendarBoard;
