import styles from "../styles/Sketchpad.module.scss";
import clearIcon from "../assets/sketch-icons/clear.svg";
import deleteIcon from "../assets/sketch-icons/delete.svg";
import eraserIcon from "../assets/sketch-icons/eraser.svg";
import penIcon from "../assets/sketch-icons/pen.svg";
import crayonIcon from "../assets/sketch-icons/crayon.svg";
import typeIcon from "../assets/sketch-icons/type.svg";

const TOOLS_1: (keyof typeof ICONS)[] = ["Pen", "Crayon", "Type"];
const TOOLS_2: (keyof typeof ICONS)[] = ["Eraser", "Clear", "Delete"];

const ICONS = {
  Pen: penIcon,
  Crayon: crayonIcon,
  Type: typeIcon,
  Eraser: eraserIcon,
  Clear: clearIcon,
  Delete: deleteIcon,
};

function Sketchpad({
  onClose,
  selectedColor,
}: {
  onClose: () => void;
  selectedColor: { hue: number; lightness: number };
}) {
  return (
    <div className={styles.sketchpad__container}>
      <button className={styles.sketchpad__close} onClick={onClose}>
        X
      </button>
      <div className={styles.sketchpad__content}>
        <SketchpadTools tools={TOOLS_1} />
        <div
          className={styles.sketchpad__note}
          style={{
            backgroundColor: `hsl(${selectedColor.hue}, 100%, ${selectedColor.lightness}%)`,
          }}
        >
          <p>Draw here</p>
        </div>
        <SketchpadTools tools={TOOLS_2} />
      </div>
    </div>
  );
}

export default Sketchpad;

function SketchpadTools({ tools }: { tools: (keyof typeof ICONS)[] }) {
  return (
    <div className={styles.sketchpad__tools}>
      {tools.map((tool, i) => (
        <div key={i}>
          <button>
            <img src={ICONS[tool]} alt={tool} />
          </button>
          {tool}
        </div>
      ))}
    </div>
  );
}
