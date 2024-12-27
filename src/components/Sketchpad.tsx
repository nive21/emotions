import { useEffect, useRef, useState } from "react";
import p5 from "p5";

import styles from "../styles/Sketchpad.module.scss";
import clearIcon from "../assets/sketch-icons/clear.svg";
import deleteIcon from "../assets/sketch-icons/delete.svg";
import eraserIcon from "../assets/sketch-icons/eraser.svg";
import penIcon from "../assets/sketch-icons/pen.svg";
import crayonIcon from "../assets/sketch-icons/crayon.svg";
import typeIcon from "../assets/sketch-icons/type.svg";

const TOOLS_1: (keyof typeof ICONS)[] = ["Pen", "Crayon", "Type"];
const TOOLS_2: (keyof typeof ICONS)[] = ["Eraser", "Clear", "Delete"];

const LINE_HEIGHT = 40; // Space between lines
const TEXT_SIZE = 32; // Font size for text input
const BLINK_INTERVAL = 500; // Caret blink interval (ms)

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
  const [selectedTool, setSelectedTool] = useState("Pen");

  return (
    <div className={styles.sketchpad__container}>
      <button className={styles.sketchpad__close} onClick={onClose}>
        X
      </button>
      <div className={styles.sketchpad__content}>
        <SketchpadTools
          {...{
            tools: TOOLS_1,
            selectedTool,
            setSelectedTool,
          }}
        />
        <SketchpadNote
          color={`hsl(${selectedColor.hue}, 100%, ${selectedColor.lightness}%)`}
          tool={selectedTool}
        />
        <SketchpadTools
          {...{
            tools: TOOLS_2,
            selectedTool,
            setSelectedTool,
          }}
        />
      </div>
    </div>
  );
}

export default Sketchpad;

type TextOption = {
  textX: number;
  initialX: number;
  textY: number;
  textInput: string;
  pointerVisible: boolean;
  numNewLines: number;
  lastBlinkTime: number;
};

function SketchpadNote({ color, tool }: { color: string; tool: string }) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const toolRef = useRef(tool);

  useEffect(() => {
    let textOptions: TextOption[] = [];

    // The top layer for ink/crayon
    // Has no background color
    const sketch = (p: p5) => {
      // Setup function
      p.setup = () => {
        p.createCanvas(360, 340).parent(sketchRef.current!);
      };

      // Draw the canvas
      p.draw = () => {
        if (toolRef.current === "Clear") {
          p.clear();
          textOptions = [];
          return;
        }

        // Handle drawing tools
        if (p.mouseIsPressed) {
          handleDrawing(p);
        }
      };

      // Drawing tools logic
      const handleDrawing = (p: p5) => {
        if (toolRef.current === "Pen") {
          p.noErase();
          p.stroke(0);
          p.strokeWeight(2);
          p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
        } else if (toolRef.current === "Eraser") {
          p.erase();
          p.strokeWeight(0);
          p.strokeWeight(6);
          p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
        } else if (toolRef.current === "Crayon") {
          p.noErase();
          p.stroke(0);
          p.strokeWeight(p.random(8, 10));
          p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
        }
      };
    };

    // The bottom layer for text input
    // Has a background color
    const text = (p: p5) => {
      // Setup function
      p.setup = () => {
        p.createCanvas(360, 340).parent(textRef.current!);
        p.background(color);
      };

      // Handle mouse click for initiating typing
      p.mousePressed = () => {
        if (toolRef.current === "Type") {
          p.strokeWeight(1);
          textOptions.push({
            textX: p.mouseX,
            initialX: p.mouseX,
            textY: p.mouseY,
            textInput: "",
            pointerVisible: true,
            numNewLines: 0,
            lastBlinkTime: p.millis(),
          });
        }
      };

      p.keyPressed = () => {
        if (toolRef.current === "Type" && textOptions.length > 0) {
          const lastestText = textOptions?.at(-1) ?? {
            textInput: "",
            numNewLines: 0,
            initialX: -1,
            textX: -1,
          };
          let { textInput, numNewLines } = lastestText;

          if (p.keyCode === p.BACKSPACE) {
            if (textInput.endsWith("\n")) {
              textInput = textInput.slice(0, -1); // Remove the newline character
              numNewLines--;
            } else if (textInput === "") {
              if (numNewLines > 0) {
                numNewLines--;
              }
            } else {
              // Remove the last character
              textInput = textInput.slice(0, -1);
            }
          } else if (p.keyCode === p.ENTER) {
            textInput += "\n";
            lastestText.textX = lastestText.initialX; // Move to initial X position
            numNewLines++;
          } else if (p.key.length === 1) {
            textInput += p.key;
          }

          lastestText.textInput = textInput;
          lastestText.numNewLines = numNewLines;
        }
      };

      // Draw the canvas
      p.draw = () => {
        // Handle text input
        if (textOptions.length) {
          p.background(color); // Clear the canvas
          p.strokeWeight(1);
          textOptions.forEach((textOption, index) => {
            renderTextAndCaret(p, textOption, index === textOptions.length - 1);
          });
        }
      };

      // Render text and caret
      const renderTextAndCaret = (
        p: p5,
        textOption: TextOption,
        isLastText: boolean
      ) => {
        p.fill(0); // Set text color
        p.textSize(TEXT_SIZE);
        p.textFont("Borel");

        const {
          textInput,
          textX,
          textY,
          numNewLines,
          pointerVisible,
          lastBlinkTime,
        } = textOption;

        // Draw the text input
        p.text(textInput, textX, textY);

        if (toolRef.current === "Type" && isLastText) {
          // Toggle caret visibility
          const currentTime = p.millis();
          if (currentTime - lastBlinkTime > BLINK_INTERVAL) {
            textOption.pointerVisible = !pointerVisible;
            textOption.lastBlinkTime = currentTime;
          }

          // Draw caret if visible
          if (pointerVisible) {
            const caretX = calculateCaretX(textInput, textX);
            const caretY = textY + numNewLines * LINE_HEIGHT;
            p.stroke(0); // Caret color. TODO: Allow change
            p.line(caretX, caretY - 20, caretX, caretY + 10);
          }
        }
      };

      // Calculate caret position
      const calculateCaretX = (textInput: string, textX: number) => {
        const lastNewlineIndex = textInput.lastIndexOf("\n");
        const visibleText =
          lastNewlineIndex === -1
            ? textInput
            : textInput.slice(lastNewlineIndex + 1);
        return textX + p.textWidth(visibleText);
      };
    };

    const p5Instance = new p5(sketch);
    const p5Instance2 = new p5(text);

    return () => {
      p5Instance.remove();
      p5Instance2.remove();
    };
  }, [color]);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  return (
    <div className={styles.sketchpad__note}>
      <div ref={textRef} className={styles.text}></div>
      <div ref={sketchRef} className={styles.sketch}></div>
    </div>
  );
}

function SketchpadTools({
  tools,
  selectedTool,
  setSelectedTool,
}: {
  tools: (keyof typeof ICONS)[];
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}) {
  return (
    <div className={styles.sketchpad__tools}>
      {tools.map((tool, i) => (
        <div key={i}>
          <button
            onClick={() => setSelectedTool(tool)}
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
