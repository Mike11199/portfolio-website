import styles from "./SectionHeading.module.css";

export default function SectionHeading({ children, icon }: { children: string; icon?: "user" | "folder-code" }) {
  return (
    <h1 className={styles.heading}>
      {icon && (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          {icon === "user" ? (
            <g transform="translate(0 -0.5)">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2Z" />
            </g>
          ) : (
            <g transform="translate(0 0.5)">
              <path d="M20 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z" />
              <path d="m9 11-3 3 3 3m6-6 3 3-3 3" />
            </g>
          )}
        </svg>
      )}
      <span className={styles.label}>{children}</span>
    </h1>
  );
}
