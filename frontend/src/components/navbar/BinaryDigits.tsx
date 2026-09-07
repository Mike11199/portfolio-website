import styles from "./BinaryDigits.module.css";

interface BinaryDigitsProps {
  text: string;
}

const BinaryDigits = ({ text }: BinaryDigitsProps) => {
  const digits = Array.from(text).flatMap((character) =>
    character.charCodeAt(0).toString(2).padStart(8, "0").split("")
  );

  return digits.map((digit, index) => (
    <div
      className={styles.blink}
      key={index}
      style={{
        animationDelay: `-${(index * 631) % 5000}ms`,
        animationDuration: `${1300 + ((index * 379) % 3700)}ms`,
      }}
    >
      <p className={styles.digit}>{digit}</p>
    </div>
  ));
};

export default BinaryDigits;
