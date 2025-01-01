import Calendar from "react-calendar";
import styles from "../styles/CalendarBoard.module.scss";
import "../styles/CalendarBoard.scss";
import { EditHandler } from "./Supplies";

type NoteType = {
  color: string;
  sketch: string;
  emotion: string;
};

export type NotesType = {
  [date: string]: {
    [timestamp: string]: NoteType;
  };
};

const MAX_EMOTIONS = 2; //0-indexed

// The calendar tab of the board
function CalendarBoard({
  selectedColor,
  handleEdit,
  setSelectedTimestamp,
}: {
  selectedColor: string;
  handleEdit: EditHandler;
  setSelectedTimestamp: (timestamp: number) => void;
}) {
  const notes: NotesType = JSON.parse(localStorage.getItem("notes") || "{}");
  let maxIndex = 0;

  const getTimestamp = (date: Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    ).getTime();
  };

  // Customize the calendar tiles to display a circle with color
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey: keyof NotesType = date.toLocaleDateString();
      if (notes[dateKey]) {
        return (
          <div className={styles.note__indicators}>
            {Object.entries(notes[dateKey]).map(([timestamp, note], index) => {
              maxIndex = index;

              return index > MAX_EMOTIONS ? null : (
                <span
                  key={`${dateKey}-${index}`}
                  style={{
                    backgroundColor: note.color,
                  }}
                  className={styles.note__indicator}
                  onClick={() => {
                    setTimeout(() => {
                      setSelectedTimestamp(Number(timestamp));
                      handleEdit(note.color);
                    });
                  }}
                >
                  {note.emotion}
                </span>
              );
            })}
            {maxIndex > MAX_EMOTIONS && (
              <span
                className={`${styles.note__indicator} ${styles.more}`}
                onClick={() => {
                  const timestamp = getTimestamp(date);
                  setSelectedTimestamp(Number(timestamp));
                }}
              >
                +{maxIndex - MAX_EMOTIONS}
              </span>
            )}
          </div>
        );
      }
    }
    // If no notes
    return null;
  };

  return (
    <>
      <div className={styles.calendar__container}>
        <Calendar
          maxDate={new Date()}
          onClickDay={(date) => {
            const timestamp = getTimestamp(date);
            setSelectedTimestamp(timestamp);
            handleEdit(selectedColor);
          }}
          tileContent={tileContent}
          tileClassName={({ date, view }) => {
            if (
              date.toDateString() === new Date().toDateString() &&
              view === "month"
            ) {
              return "react-calendar__tile--today";
            }
          }}
        />
      </div>
    </>
  );
}

export default CalendarBoard;
