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

// Conversions for the color picker
export function hslToHex(hsl: string): string {
  // Parse the HSL string
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) throw new Error("Invalid HSL format");
  const [, h, s, l] = match.map(Number);

  // Convert HSL to RGB
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  const k = (n: number) => (n + hue * 12) % 12;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const f = (n: number) =>
    Math.round(
      255 *
        (lightness -
          a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );

  const r = f(0);
  const g = f(8);
  const b = f(4);

  // Convert RGB to HEX
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function hexToHsl(hex: string): string {
  // Parse the HEX string
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}
