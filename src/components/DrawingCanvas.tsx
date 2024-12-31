import { useEffect, useRef, useState } from "react";
import styles from "../styles/Sketchpad.module.scss";
import { ICONS, TOOL_NAMES, ToolsType } from "../utils/const";
import SketchpadNote from "./SketchpadNote";
import { NotesType } from "./CalendarBoard";
import next from "../assets/misc-icons/next.svg";
import prev from "../assets/misc-icons/prev.svg";
import Calendar from "react-calendar";

const TOOLS_1: ToolsType[] = [
  TOOL_NAMES.Pen,
  TOOL_NAMES.Crayon,
  TOOL_NAMES.Type,
];
const TOOLS_2: ToolsType[] = [
  TOOL_NAMES.Download,
  TOOL_NAMES.Clear,
  TOOL_NAMES.Delete,
];

function DrawingCanvas({
  emotion,
  selectedTool,
  setSelectedTool,
  selectedColor,
  timestamp,
  save,
  onClose,
  fromCalendar,
}: {
  emotion: string;
  selectedTool: ToolsType;
  setSelectedTool: (tool: ToolsType) => void;
  selectedColor?: string;
  timestamp: number;
  save: boolean;
  onClose: () => void;
  fromCalendar?: boolean;
}) {
  const [selectedTimestamp, setSelectedTimestamp] = useState(timestamp);

  return (
    <div className={styles.sketchpad}>
      <div className={styles.sketchpad__with_title}>
        {selectedColor && (
          <>
            <h2 className={styles.title}>
              {fromCalendar ? "Sketch how you felt." : "Sketch how you feel."}
            </h2>
            <div className={styles.sketchpad__content}>
              <SketchpadTools
                {...{
                  tools: TOOLS_1,
                  selectedTool,
                  setSelectedTool,
                }}
              />
              <SketchpadNote
                emotion={emotion}
                color={selectedColor}
                tool={selectedTool}
                timestamp={selectedTimestamp}
                save={save}
                onClose={onClose}
              />
              <SketchpadTools
                {...{
                  tools: TOOLS_2,
                  selectedTool,
                  setSelectedTool,
                }}
              />
            </div>
          </>
        )}
      </div>
      <Timeline {...{ selectedTimestamp, setSelectedTimestamp }} />
    </div>
  );
}

export default DrawingCanvas;

function Timeline({
  selectedTimestamp,
  setSelectedTimestamp,
}: {
  selectedTimestamp: number;
  setSelectedTimestamp: (timestamp: number) => void;
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date(selectedTimestamp).toLocaleDateString()
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const notes: NotesType = JSON.parse(localStorage.getItem("notes") || "{}");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Convert the date string into a Date object
  const getPreviousDate = (date: string) => {
    const current = new Date(date);
    current.setDate(current.getDate() - 1);
    return current.toLocaleDateString();
  };

  const getNextDate = (date: string) => {
    const current = new Date(date);
    current.setDate(current.getDate() + 1);
    return current.toLocaleDateString();
  };

  const handlePrevious = () => {
    const previousDate = getPreviousDate(currentDate);
    setCurrentDate(previousDate);
  };

  const handleNext = () => {
    const nextDate = getNextDate(currentDate);
    setCurrentDate(nextDate);
  };

  // Render notes for the current date
  const renderNotes = (date: string) => {
    const dayNotes = notes[date] || {};
    const totalMinutesInDay = 24 * 60;

    return Object.entries(dayNotes).map(([timestamp, note]) => {
      // Parse the timestamp to calculate its position
      const time = new Date(parseInt(timestamp));
      const minutesFromStart = time.getHours() * 60 + time.getMinutes(); // Total minutes since 12AM
      const leftPercentage = (minutesFromStart / totalMinutesInDay) * 100;

      return (
        <div
          key={timestamp}
          className={styles.timeline__note}
          style={{
            position: "absolute",
            left: `${leftPercentage}%`,
          }}
          onClick={() => setSelectedTimestamp(parseInt(timestamp))}
        >
          <img src={note.sketch} alt="Sketch" />
        </div>
      );
    });
  };

  return (
    <>
      {showCalendar && (
        <div className={styles.calendar__overlay} ref={calendarRef}>
          <Calendar
            value={new Date(currentDate)}
            onClickDay={(value) => {
              setCurrentDate(value.toLocaleDateString());
              setShowCalendar(false);
            }}
            tileClassName={({ date, view }) => {
              if (
                date.toDateString() === new Date().toDateString() &&
                view === "month"
              ) {
                return "react-calendar__tile--today";
              }

              if (
                date.toDateString() === new Date(currentDate).toDateString() &&
                view === "month"
              ) {
                return "react-calendar__tile--selected";
              }
              return null;
            }}
          />
        </div>
      )}
      <div className={styles.sketchpad__timeline}>
        <h2 className={styles.title} style={{ textAlign: "center" }}>
          <button onClick={handlePrevious}>
            <img src={prev} alt="Previous" />
          </button>
          <span onClick={() => setShowCalendar(!showCalendar)}>
            {currentDate}
          </span>
          <button onClick={handleNext}>
            <img src={next} alt="Next" />
          </button>
        </h2>
        <div className={styles.timeline__container}>
          <div className={styles.timeline__hours}>
            {[
              "12AM",
              "3AM",
              "6AM",
              "9AM",
              "12PM",
              "3PM",
              "6PM",
              "9PM",
              "12AM",
            ].map((time, i) => (
              <span key={i}>{time}</span>
            ))}
          </div>
          <hr />
          <div className={styles.timeline__notes}>
            {renderNotes(currentDate)}
          </div>
        </div>
      </div>
    </>
  );
}

function SketchpadTools({
  tools,
  selectedTool,
  setSelectedTool,
}: {
  tools: ToolsType[];
  selectedTool: ToolsType;
  setSelectedTool: (tool: ToolsType) => void;
}) {
  return (
    <div className={styles.sketchpad__tools}>
      {tools.map((tool, i) => (
        <div key={i}>
          <button
            onClick={() => {
              const prevTool: ToolsType = selectedTool;

              if (tool === TOOL_NAMES.Clear || tool === TOOL_NAMES.Download) {
                setSelectedTool(tool);
                setTimeout(() => {
                  setSelectedTool(prevTool);
                }, 200);
              } else {
                setSelectedTool(tool);
              }
            }}
            className={selectedTool === tool ? styles.active : ""}
          >
            <img src={ICONS[tool]} alt={tool} />
          </button>
          {tool}
        </div>
      ))}
    </div>
  );
}
