import styles from "../styles/Sketchpad.module.scss";
import { ICONS, TOOL_NAMES, ToolsType } from "../utils/const";
import SketchpadNote from "./SketchpadNote";

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
}: {
  emotion: string;
  selectedTool: ToolsType;
  setSelectedTool: (tool: ToolsType) => void;
  selectedColor: string;
  timestamp: number;
  save: boolean;
}) {
  return (
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
        timestamp={timestamp}
        save={save}
      />
      <SketchpadTools
        {...{
          tools: TOOLS_2,
          selectedTool,
          setSelectedTool,
        }}
      />
    </div>
  );
}

export default DrawingCanvas;

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
