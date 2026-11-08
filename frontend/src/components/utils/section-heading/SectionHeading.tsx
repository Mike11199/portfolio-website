import styles from "./SectionHeading.module.css";

export default function SectionHeading({ children }: { children: string }) {
  return <h1 className={styles.heading}>{children}</h1>;
}
