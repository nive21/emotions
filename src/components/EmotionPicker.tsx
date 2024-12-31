import { categories, EMOTIONS, intensities } from "../utils/emotionList";
import Pannable from "webrix/components/Pannable";
import styles from "../styles/EmotionPicker.module.scss";
import popupstyles from "../styles/Popup.module.scss";
import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIntensity, setSelectedIntensity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // TODO: Currently pannable is not used. Decide if you want a pannable pick area
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
          <FilterOptions
            {...{
              selectedCategory,
              setSelectedCategory,
              selectedIntensity,
              setSelectedIntensity,
              searchTerm,
              setSearchTerm,
            }}
          />
          <Pannable>
            <div className={styles.emotion__list}>
              {Object.entries(EMOTIONS).map(
                ([pickedEmotion, { category, intensity, value }], i) => {
                  if (
                    (selectedCategory !== "all" &&
                      selectedCategory !== category) ||
                    (selectedIntensity !== "all" &&
                      selectedIntensity !== intensity)
                  ) {
                    return null;
                  }

                  if (
                    searchTerm &&
                    !pickedEmotion
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return null;
                  }

                  const userCount = emotionsCountUser[pickedEmotion].value || 0;
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
                            [pickedEmotion]: {
                              ...emotionsCountUser[pickedEmotion],
                              value: value - 1,
                            },
                          });
                          localStorage.setItem("emotions", updatedCount);
                        }
                      }}
                    >
                      <div className={styles.emotion_tooltip}>
                        {userCount}/{value} available
                      </div>
                      {pickedEmotion}
                    </button>
                  );
                }
              )}
            </div>
          </Pannable>
        </div>
      </div>
    </>
  );
}

export default EmotionPicker;

function FilterOptions({
  selectedCategory,
  setSelectedCategory,
  selectedIntensity,
  setSelectedIntensity,
  searchTerm,
  setSearchTerm,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedIntensity: string;
  setSelectedIntensity: (intensity: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <div className={styles.filter_options_container}>
      <input
        type="text"
        placeholder="Search emotions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {Object.entries(categories).map(([category, label], i) => (
          <option key={i} value={category}>
            {label}
          </option>
        ))}
      </select>
      <select
        value={selectedIntensity}
        onChange={(e) => setSelectedIntensity(e.target.value)}
      >
        {Object.entries(intensities).map(([intensity, label], i) => (
          <option key={i} value={intensity}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Reset confirmation modal
function ResetConfirmation({
  onReset,
}: {
  onReset: (toReset: boolean) => void;
}) {
  return (
    <>
      <div className={popupstyles.confirmation__popup}>
        <h2>Are you sure?</h2>
        <p>
          While a reset gives you freedom, staying within limits can push you to
          expand your emotional vocabulary — an important step toward greater
          self-awareness.
        </p>
        <div className={popupstyles.buttons}>
          <button onClick={() => onReset(true)}>Reset</button>
          <button onClick={() => onReset(false)}>Cancel</button>
        </div>
      </div>
      <div className={popupstyles.popup__overlay}></div>
    </>
  );
}
