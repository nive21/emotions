import { EMOTIONS } from "../utils/emotionList";
import Pannable from "webrix/components/Pannable";
import styles from "../styles/Sketchpad.module.scss";
import { useState } from "react";

type EmotionTypeType = keyof typeof EMOTIONS;

const resetEmotions = () => {
  localStorage.setItem("emotions", JSON.stringify(EMOTIONS));
};

function EmotionPicker({
  emotion,
  setEmotion,
}: {
  emotion: string;
  setEmotion: (emotion: string) => void;
}) {
  // Stores the count remaining for each emotion
  const emotionsCountUserFile = localStorage.getItem("emotions");
  const [emotionsCountUser, setEmotionsCountUser] = useState(
    emotionsCountUserFile ? JSON.parse(emotionsCountUserFile) : EMOTIONS
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!emotionsCountUser) {
    resetEmotions();
  }

  const handleResetClick = (toReset: boolean) => {
    if (toReset) {
      resetEmotions();
      setEmotionsCountUser(EMOTIONS);
    }
    setShowConfirmation(false);
  };

  // TODO: Currenly pannable is not used. Decide if you want a pannable pick area
  return (
    <>
      {showConfirmation && <ResetConfirmation onReset={handleResetClick} />}
      <div className={styles.emotion__container_page}>
        <button
          className={styles.reset_button}
          onClick={() => {
            setShowConfirmation(true);
          }}
        >
          Reset Emotions
        </button>
        <div className={styles.emotion__container}>
          <h2 className={styles.title}>How are you feeling?</h2>
          <Pannable>
            <div className={styles.emotion__list}>
              {Object.keys(EMOTIONS).map((emotionType) =>
                Object.keys(EMOTIONS[emotionType as EmotionTypeType]).map(
                  (intensity) =>
                    Object.entries(
                      EMOTIONS[emotionType as EmotionTypeType][
                        intensity as keyof (typeof EMOTIONS)[EmotionTypeType]
                      ]
                    ).map(
                      ([pickedEmotion, count]: [string, number], i: number) => {
                        const emotionsOfIntensity =
                          emotionsCountUser[emotionType][intensity];
                        const userCount =
                          emotionsOfIntensity[pickedEmotion] || 0;

                        return (
                          <button
                            key={i}
                            className={`${!userCount ? styles.disabled : ""} ${
                              pickedEmotion === emotion ? styles.active : ""
                            }`.trim()}
                            onClick={() => {
                              setEmotion(pickedEmotion);

                              if (userCount >= 0) {
                                // Reduce the used count of the picked emotion by 1
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
                              {userCount}/{count} available
                            </div>
                            {pickedEmotion}
                          </button>
                        );
                      }
                    )
                )
              )}
            </div>
          </Pannable>
        </div>
      </div>
    </>
  );
}

export default EmotionPicker;

// Reset confirmation modal
function ResetConfirmation({
  onReset,
}: {
  onReset: (toReset: boolean) => void;
}) {
  return (
    <>
      <div className={styles.confirmation__popup}>
        <h2>Are you sure?</h2>
        <p>
          While a reset gives you freedom, staying within limits can push you to
          expand your emotional vocabulary — an important step toward greater
          self-awareness.
        </p>
        <div className={styles.buttons}>
          <button onClick={() => onReset(true)}>Reset</button>
          <button onClick={() => onReset(false)}>Cancel</button>
        </div>
      </div>
      <div className={styles.popup__overlay}></div>
    </>
  );
}
