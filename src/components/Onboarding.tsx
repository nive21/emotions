import styles from "../styles/Onboarding.module.scss";
import heart from "../assets/onboarding-icons/heart.svg";
import butterfly from "../assets/onboarding-icons/butterfly.svg";
import cupcake from "../assets/onboarding-icons/cupcake.svg";
import flower from "../assets/onboarding-icons/flower.svg";

// The introduction onboarding screen
export function OnboardingIntro({ onClick }: { onClick: () => void }) {
  return (
    <Onboarding
      description={
        <p>
          Identifying and distinguishing <span>emotions</span> clearly can
          improve well-being.
        </p>
      }
      buttonText="Okay"
      onClick={onClick}
    />
  );
}

// The second onboarding screen explaining the concept of the app
export function OnboardingOutro({ onClick }: { onClick: () => void }) {
  return (
    <Onboarding
      description={
        <p>
          We have sticky notes, a wide range of emotional vocabulary and other
          supplies to help you record.
          <br />
          <br />
          Please note that <span>each emotion has a limit</span> to challenge
          you to explore.
        </p>
      }
      buttonText="Get started"
      onClick={onClick}
    />
  );
}

// The onboarding screen template
function Onboarding({
  description,
  buttonText,
  onClick,
}: {
  description: JSX.Element;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div className={styles.onboarding}>
        <img
          src={heart}
          alt="heart"
          className={`${styles.heart} ${styles.doodle}`}
        />
        <img
          src={butterfly}
          alt="butterfly"
          className={`${styles.butterfly} ${styles.doodle}`}
        />
        <img
          src={cupcake}
          alt="cupcake"
          className={`${styles.cupcake} ${styles.doodle}`}
        />
        <img
          src={flower}
          alt="flower"
          className={`${styles.flower} ${styles.doodle}`}
        />
      </div>
      <div className={styles.onboarding__container}>
        <h1 className={styles.description}>{description}</h1>
        <button onClick={onClick}>{buttonText}</button>
      </div>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.desktopMessage}>
        Please view this app on a desktop for a better experience.
      </p>
      <p>Made with ♡ by NK</p>
    </div>
  );
}
