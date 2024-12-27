import Calendar from "react-calendar";
import styles from "../styles/CalendarBoard.module.scss";
import "../styles/CalendarBoard.scss";

// The calendar tab of the board
function CalendarBoard() {
  return (
    <div className={styles.calendar__container}>
      <Calendar maxDate={new Date()} />
    </div>
  );
}

export default CalendarBoard;
