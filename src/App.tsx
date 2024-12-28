import { useEffect, useState } from "react";
import Board from "./components/Board";
import { OnboardingIntro, OnboardingOutro } from "./components/Onboarding";

function App() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  // Check if the user is visiting the app for the first time
  useEffect(() => {
    if (!localStorage.getItem("isFirstTime")) {
      setIsFirstTime(true);
      localStorage.setItem("isFirstTime", "true");
    }
  }, []);

  // If next button is clicked, show the outro
  const handleNextClick = () => {
    setNextClicked(true);
  };

  // If get started button is clicked, show the board
  const handleGetStartedClick = () => {
    setIsFirstTime(false);
  };

  // If help button is clicked, show the intro
  const handleHelpClick = () => {
    setIsFirstTime(true);
    setNextClicked(false);
  };

  return (
    <>
      {isFirstTime ? (
        !nextClicked ? (
          <OnboardingIntro onClick={handleNextClick} />
        ) : (
          <OnboardingOutro onClick={handleGetStartedClick} />
        )
      ) : (
        <Board onClick={handleHelpClick} />
      )}
    </>
  );
}

export default App;
