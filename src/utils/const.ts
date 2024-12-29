import clearIcon from "../assets/sketch-icons/clear.svg";
import deleteIcon from "../assets/sketch-icons/delete.svg";
import penIcon from "../assets/sketch-icons/pen.svg";
import crayonIcon from "../assets/sketch-icons/crayon.svg";
import typeIcon from "../assets/sketch-icons/type.svg";
import downloadIcon from "../assets/sketch-icons/download.svg";

export const ICONS = {
  Pen: penIcon,
  Crayon: crayonIcon,
  Type: typeIcon,
  Download: downloadIcon,
  Clear: clearIcon,
  Delete: deleteIcon,
};

export type ToolsType = keyof typeof ICONS;
export const TOOL_NAMES = {
  Pen: "Pen",
  Crayon: "Crayon",
  Type: "Type",
  Download: "Download",
  Clear: "Clear",
  Delete: "Delete",
} as const;
