import { useEffect, useRef, useState } from "react";
import p5 from "p5";

import styles from "../styles/Sketchpad.module.scss";
import clearIcon from "../assets/sketch-icons/clear.svg";
import deleteIcon from "../assets/sketch-icons/delete.svg";
import penIcon from "../assets/sketch-icons/pen.svg";
import crayonIcon from "../assets/sketch-icons/crayon.svg";
import typeIcon from "../assets/sketch-icons/type.svg";
import downloadIcon from "../assets/sketch-icons/download.svg";

type ToolsType = keyof typeof ICONS;

const TOOLS_1: ToolsType[] = ["Pen", "Crayon", "Type"];
const TOOLS_2: ToolsType[] = ["Download", "Clear", "Delete"];

const LINE_HEIGHT = 40; // Space between lines
const TEXT_SIZE = 32; // Font size for text input
const BLINK_INTERVAL = 500; // Caret blink interval (ms)
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 340;

const ICONS = {
  Pen: penIcon,
  Crayon: crayonIcon,
  Type: typeIcon,
  Download: downloadIcon,
  Clear: clearIcon,
  Delete: deleteIcon,
};

function Sketchpad({
  onClose,
  selectedColor,
}: {
  onClose: () => void;
  selectedColor: string;
}) {
  const [selectedTool, setSelectedTool] = useState<ToolsType>("Pen");

  return (
    <div className={styles.sketchpad__container}>
      <button className={styles.sketchpad__close} onClick={onClose}>
        X
      </button>
      {selectedTool === "Delete" && (
        <DeleteConfirmation
          onDelete={(toDelete: boolean) => {
            if (toDelete) {
              localStorage.removeItem("notes");
              onClose();
            }
            setSelectedTool("Pen");
          }}
        />
      )}
      <div className={styles.sketchpad__content}>
        <SketchpadTools
          {...{
            tools: TOOLS_1,
            selectedTool,
            setSelectedTool,
          }}
        />
        <SketchpadNote color={selectedColor} tool={selectedTool} />
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

// Delete confirmation modal
function DeleteConfirmation({
  onDelete,
}: {
  onDelete: (toDelete: boolean) => void;
}) {
  return (
    <>
      <div className={styles.delete__confirmation}>
        <h2>Are you sure?</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className={styles.delete__buttons}>
          <button onClick={() => onDelete(true)}>Delete</button>
          <button onClick={() => onDelete(false)}>Cancel</button>
        </div>
      </div>
      <div className={styles.delete__overlay}></div>
    </>
  );
}

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
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(sketchRef.current!);
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
        if (toolRef.current === "Clear") {
          p.clear();
          p.background(color);
          textOptions = [];
          return;
        }

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

    if (tool === "Download") {
      handleSave(true);
    }
  }, [tool]);

  const handleSave = (toDownload: boolean) => {
    const sketchCanvas = sketchRef.current?.querySelector("canvas");
    const textCanvas = textRef.current?.querySelector("canvas");

    if (sketchCanvas && textCanvas) {
      // Create an offscreen canvas to combine both canvases
      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = CANVAS_WIDTH;
      combinedCanvas.height = CANVAS_HEIGHT;

      const context = combinedCanvas.getContext("2d");
      if (context) {
        // Draw the canvases
        context.drawImage(textCanvas, 0, 0);
        context.drawImage(sketchCanvas, 0, 0);

        if (toDownload) {
          // Create a link element to save the image
          const link = document.createElement("a");

          // Format the date for the filename
          const formattedDate = new Date(Date.now())
            .toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              hour: "numeric",
              hour12: true,
            })
            .replace(", ", "-");
          link.download = `note-${formattedDate}.png`;
          link.href = combinedCanvas.toDataURL("image/png");

          // Trigger the download
          link.click();
        } else {
          // Save the image to localStorage if save was clicked
          const imageData = combinedCanvas.toDataURL("image/png");
          const date = new Date(Date.now()).toLocaleDateString();

          const notes = JSON.parse(localStorage.getItem("notes") || "{}");
          const note = {
            timestamp: Date.now(),
            sketch: imageData,
            color,
          };

          if (notes[date]) {
            notes[date] = [...notes[date], note];
          } else {
            notes[date] = [note];
          }
          localStorage.setItem("notes", JSON.stringify(notes));
        }
      }
    }
  };

  return (
    <div className={styles.sketchpad__note}>
      <div ref={textRef} className={styles.text}></div>
      <div ref={sketchRef} className={styles.sketch}></div>
      <button
        className={styles.sketchpad__save}
        onClick={() => handleSave(false)}
      >
        Save
      </button>
    </div>
  );
}

function SketchpadTools({
  tools,
  selectedTool,
  setSelectedTool,
}: {
  tools: (keyof typeof ICONS)[];
  selectedTool: ToolsType;
  setSelectedTool: (tool: ToolsType) => void;
}) {
  return (
    <div className={styles.sketchpad__tools}>
      {tools.map((tool, i) => (
        <div key={i}>
          <button
            onClick={() => {
              const prevTool: keyof typeof ICONS = selectedTool;

              if (tool === "Clear" || tool === "Download") {
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
