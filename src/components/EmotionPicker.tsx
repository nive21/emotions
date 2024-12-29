import { EMOTIONS } from "../utils/emotionList";
import Pannable from "webrix/components/Pannable";
import styles from "../styles/Sketchpad.module.scss";

type EmotionCount = Record<string, number>;
const emotionsList: string[] = Object.values(EMOTIONS).reduce(
  (
    acc: string[],
    emotion: {
      soft: EmotionCount;
      medium: EmotionCount;
      intense: EmotionCount;
    }
  ) => [
    ...acc,
    ...Object.keys(emotion.soft),
    ...Object.keys(emotion.medium),
    ...Object.keys(emotion.intense),
  ],
  [] as string[]
);

function EmotionPicker({
  emotion,
  setEmotion,
}: {
  emotion: string;
  setEmotion: (emotion: string) => void;
}) {
  // TODO: Currenly pannable is not used. Decide if you want a pannable pick area
  return (
    <div className={styles.emotion__container}>
      <h2>How are you feeling?</h2>
      <Pannable>
        <div className={styles.emotion__list}>
          {emotionsList.map((pickedEmotion, i) => (
            <button
              key={i}
              className={emotion === pickedEmotion ? styles.active : ""}
              onClick={() => setEmotion(pickedEmotion)}
            >
              {pickedEmotion}
            </button>
          ))}
        </div>
      </Pannable>
    </div>
  );
}

export default EmotionPicker;
