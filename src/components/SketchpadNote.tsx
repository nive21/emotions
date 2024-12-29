import p5 from "p5";
import { useCallback, useEffect, useRef } from "react";
import { NotesType } from "./CalendarBoard";
import styles from "../styles/Sketchpad.module.scss";
import { TOOL_NAMES } from "../utils/const";

const LINE_HEIGHT = 40; // Space between lines
const TEXT_SIZE = 32; // Font size for text input
const BLINK_INTERVAL = 500; // Caret blink interval (ms)
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 340;

type TextOption = {
  textX: number;
  initialX: number;
  textY: number;
  textInput: string;
  pointerVisible: boolean;
  numNewLines: number;
  lastBlinkTime: number;
};

function SketchpadNote({
  emotion,
  color,
  tool,
  timestamp,
  save,
}: {
  emotion: string;
  color: string;
  tool: string;
  timestamp: number;
  save: boolean;
}) {
  const notes: NotesType = JSON.parse(localStorage.getItem("notes") || "{}");
  const date = new Date(timestamp).toLocaleDateString();

  const sketchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const toolRef = useRef(tool);
  const notesRef = useRef(notes);

  const handleSave = useCallback(
    (toDownload: boolean) => {
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
          context.drawImage(textCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          context.drawImage(sketchCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          if (toDownload) {
            // Create a link element to save the image
            const link = document.createElement("a");

            // Format the date for the filename
            const formattedDate = new Date(timestamp)
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
            const note = {
              sketch: imageData,
              color,
            };

            if (!notes[date]) notes[date] = {};
            notes[date][timestamp] = note;
            localStorage.setItem("notes", JSON.stringify(notes));
          }
        }
      }
    },
    [color, date, notes, timestamp]
  );

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  if (toolRef.current === "Download") {
    handleSave(true);
  }

  useEffect(() => {
    let textOptions: TextOption[] = [];
    let storedImage: p5.Image | null = null;

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
        if (toolRef.current === TOOL_NAMES.Pen) {
          p.noErase();
          p.stroke(0);
          p.strokeWeight(2);
          p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
        } else if (toolRef.current === TOOL_NAMES.Crayon) {
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

        const currentNotes = notesRef.current;

        // Load the stored image if it exists
        if (currentNotes?.[date]?.[timestamp]) {
          storedImage = p.loadImage(
            currentNotes[date][timestamp].sketch,
            () => {
              console.info("Image loaded");
            },
            (error) => {
              console.error("Error loading image", error);
            }
          );
        }
      };

      // Handle mouse click for initiating typing
      p.mousePressed = () => {
        if (toolRef.current === TOOL_NAMES.Type) {
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
        if (toolRef.current === TOOL_NAMES.Type && textOptions.length > 0) {
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
        p.fill(0); // Set text color
        p.strokeWeight(1);
        p.textSize(TEXT_SIZE);
        p.textFont("Borel");

        if (storedImage) {
          // Draw the stored image
          p.image(storedImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        if (toolRef.current === TOOL_NAMES.Clear) {
          p.clear();
          p.background(color);
          renderEmotion(p);

          textOptions = [];
          storedImage = null;
          return;
        }

        // Handle text input
        if (textOptions.length) {
          p.background(color); // Clear the canvas
          textOptions.forEach((textOption, index) => {
            renderTextAndCaret(p, textOption, index === textOptions.length - 1);
          });
        }

        renderEmotion(p);
        p.textAlign(p.LEFT);
      };

      // Render the emotion text
      const renderEmotion = (p: p5) => {
        const text = `I feel\n${emotion.toLowerCase()}`;
        console.log(text);
        p.textAlign(p.CENTER);
        p.text(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      };

      // Render text and caret
      const renderTextAndCaret = (
        p: p5,
        textOption: TextOption,
        isLastText: boolean
      ) => {
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

        if (toolRef.current === TOOL_NAMES.Type && isLastText) {
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
  }, [color, date, timestamp, emotion]);

  useEffect(() => {
    if (save) {
      handleSave(false);
    }
  }, [save, handleSave]);

  // Save the note every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSave(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [handleSave]);

  return (
    <div className={styles.sketchpad__note}>
      <div ref={textRef} className={styles.text}></div>
      <div ref={sketchRef} className={styles.sketch}></div>
    </div>
  );
}

export default SketchpadNote;
