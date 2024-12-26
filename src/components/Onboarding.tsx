import styles from "../styles/Onboarding.module.scss";

// The onboarding screen template
function Onboarding({
  description,
  buttonText,
}: {
  description: JSX.Element;
  buttonText: string;
}) {
  return (
    <>
      <div className={styles.onboarding__container}>
        <h1 className={styles.description}>{description}</h1>
        <button>{buttonText}</button>
      </div>
      <p className={styles.footer}>
        Made with ♡ by <a href="https://www.linkedin.com/in/nivemathan/">NK</a>
      </p>
    </>
  );
}

// The introduction onboarding screen
export function OnboardingIntro() {
  return (
    <Onboarding
      description={
        <p>
          Identifying and distinguishing <span>emotions</span> clearly can
          improve well-being.
        </p>
      }
      buttonText="Okay"
    />
  );
}

// The second onboarding screen explaining the concept of the app
export function OnboardingOutro() {
  return (
    <Onboarding
      description={
        <p>
          We have sticky notes, a wide range of emotional vocabulary and other
          supplies to help you record.
          <br />
          Please note that <span>each emotion has a limit</span> to challenge
          you to explore.
        </p>
      }
      buttonText="Get started"
    />
  );
}
