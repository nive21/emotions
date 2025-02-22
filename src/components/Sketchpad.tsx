import { useEffect, useState } from "react";
import { NotesType } from "./CalendarBoard";
import EmotionPicker from "./EmotionPicker";

import styles from "../styles/Sketchpad.module.scss";
import popupstyles from "../styles/Popup.module.scss";
import { TOOL_NAMES, ToolsType } from "../utils/const";
import DrawingCanvas from "./DrawingCanvas";

function Sketchpad({
  onClose,
  selectedColor,
  timestamp,
  fromCalendar = false,
  setSelectedColor,
}: {
  onClose: () => void;
  selectedColor?: string;
  timestamp: number;
  fromCalendar?: boolean;
  setSelectedColor: (color: string) => void;
}) {
  const [selectedTool, setSelectedTool] = useState<ToolsType>(TOOL_NAMES.Pen);
  const [save, setSave] = useState(false);
  const notes: NotesType = JSON.parse(localStorage.getItem("notes") || "{}");
  const [emotion, setEmotion] = useState("");

  const date = new Date(timestamp).toLocaleDateString();
  //   If emotion is not available in localStorage, use the emotion prop
  const pickedEmotion = notes[date]?.[timestamp]?.emotion;
  const pickedColor = notes[date]?.[timestamp]?.color;

  useEffect(() => {
    if (pickedEmotion) {
      setEmotion(pickedEmotion);
    }
  }, [pickedEmotion]);

  useEffect(() => {
    if (pickedColor) {
      setSelectedColor(pickedColor);
    }
  }, [pickedColor, setSelectedColor]);

  return (
    <div className={styles.sketchpad__container}>
      <button
        className={styles.sketchpad__close}
        onClick={() => {
          setSave(true);
          setTimeout(() => {
            onClose();
          }, 20);
        }}
      >
        X
      </button>
      {selectedTool === TOOL_NAMES.Delete && (
        <DeleteConfirmation
          onDelete={(toDelete: boolean) => {
            if (toDelete) {
              if (notes?.[date]?.[timestamp]) {
                delete notes[date][timestamp];
                localStorage.setItem("notes", JSON.stringify(notes));
              }
              onClose();
            }
            setSelectedTool(TOOL_NAMES.Pen);
          }}
        />
      )}
      {emotion ? (
        <DrawingCanvas
          {...{
            emotion,
            selectedTool,
            setSelectedTool,
            selectedColor,
            setSelectedColor,
            timestamp,
            save,
            onClose,
            fromCalendar,
          }}
        />
      ) : (
        <EmotionPicker
          {...{
            emotion,
            setEmotion,
            fromCalendar,
            timestamp,
          }}
        />
      )}
    </div>
  );
}

export default Sketchpad;

// Delete confirmation modal
function DeleteConfirmation({
  onDelete,
}: {
  onDelete: (toDelete: boolean) => void;
}) {
  return (
    <>
      <div className={popupstyles.confirmation__popup}>
        <h2>Are you sure?</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className={popupstyles.buttons}>
          <button onClick={() => onDelete(true)}>Delete</button>
          <button onClick={() => onDelete(false)}>Cancel</button>
        </div>
      </div>
      <div className={popupstyles.popup__overlay}></div>
    </>
  );
}
