import { EMOTIONS } from "../utils/emotionList";
import Pannable from "webrix/components/Pannable";
import styles from "../styles/Sketchpad.module.scss";

type EmotionTypeType = keyof typeof EMOTIONS;

function EmotionPicker({
  emotion,
  setEmotion,
}: {
  emotion: string;
  setEmotion: (emotion: string) => void;
}) {
  // Stores the count remaining for each emotion
  const emotionsCountUserFile = localStorage.getItem("emotions");
  const emotionsCountUser = emotionsCountUserFile
    ? JSON.parse(emotionsCountUserFile)
    : EMOTIONS;

  if (!emotionsCountUser) {
    localStorage.setItem("emotions", JSON.stringify(EMOTIONS));
  }

  // TODO: Currenly pannable is not used. Decide if you want a pannable pick area
  return (
    <div className={styles.emotion__container}>
      <h2>How are you feeling?</h2>
      <Pannable>
        <div className={styles.emotion__list}>
          {Object.keys(EMOTIONS).map((emotionType) =>
            Object.keys(EMOTIONS[emotionType as EmotionTypeType]).map(
              (intensity) =>
                Object.entries(
                  EMOTIONS[emotionType as EmotionTypeType][
                    intensity as keyof (typeof EMOTIONS)[EmotionTypeType]
                  ]
                ).map(([pickedEmotion, count]: [string, number], i: number) => {
                  const emotionsOfIntensity =
                    emotionsCountUser[emotionType][intensity];
                  const userCount = emotionsOfIntensity[pickedEmotion] || 0;

                  return (
                    <button
                      key={i}
                      className={`${!userCount ? styles.disabled : ""} ${
                        pickedEmotion === emotion ? styles.active : ""
                      }`.trim()}
                      onClick={() => {
                        setEmotion(pickedEmotion);

                        if (userCount >= 0) {
                          // Reduce the availability count of the picked emotion by 1
                          const updatedCount = JSON.stringify({
                            ...emotionsCountUser,
                            [emotionType]: {
                              ...emotionsCountUser[emotionType],
                              [intensity]: {
                                ...emotionsOfIntensity,
                                [pickedEmotion]: userCount - 1,
                              },
                            },
                          });

                          localStorage.setItem("emotions", updatedCount);
                        }
                      }}
                    >
                      <div className={styles.emotion_tooltip}>
                        {count - userCount}/{count} times used
                      </div>
                      {pickedEmotion}
                    </button>
                  );
                })
            )
          )}
        </div>
      </Pannable>
    </div>
  );
}

export default EmotionPicker;
