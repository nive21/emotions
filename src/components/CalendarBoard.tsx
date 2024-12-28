import Calendar from "react-calendar";
import styles from "../styles/CalendarBoard.module.scss";
import "../styles/CalendarBoard.scss";
import Sketchpad from "./Sketchpad";
import { EditHandler } from "./Supplies";

type NoteType = {
  color: string;
  sketch: string;
  timestamp: number;
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
  const notesByDate = JSON.parse(localStorage.getItem("notes") || "{}");

  // Customize the calendar tiles to display a circle with color
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey = date.toLocaleDateString();
      if (notesByDate[dateKey]) {
        return (
          <div className={styles.note__indicators}>
            {notesByDate[dateKey].map((note: NoteType, index: number) => (
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                key={`${dateKey}-${index}`}
                style={{
                  left: `${index * 26}px`,
                }}
                onClick={() => handleEdit(note.color)}
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
        <Sketchpad onClose={handleClose} selectedColor={selectedColor} />
      )}
      <div className={styles.calendar__container}>
        <Calendar maxDate={new Date()} tileContent={tileContent} />
      </div>
    </>
  );
}

export default CalendarBoard;
