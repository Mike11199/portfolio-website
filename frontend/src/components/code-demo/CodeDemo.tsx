/** Displays selectable code examples with their sample terminal output. */
import { useId, useState } from "react";
import HighlightedCode from "./HighlightedCode";
import { DIVIDER_HEIGHT, useResizablePanel } from "./useResizablePanel";
import { codeExamples } from "./examples";
import styles from "./CodeDemo.module.css";

const languageIcons: Record<string, string> = {
  Python: "python/python-original.svg",
  "C#": "csharp/csharp-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  "GitLab CI": "gitlab/gitlab-original.svg",
  Docker: "docker/docker-original.svg",
};


const CodeDemo = () => {
  const [active, setActive] = useState(0);
  const example = codeExamples[active];
  const editorId = useId();
  const { panelsRef, editorHeight, separatorProps } = useResizablePanel();

  return (
    <section className={styles.demo} aria-label="Code demo">
      <div className={styles.toolbar}>
        <div className={styles.languages} role="group" aria-label="Example language">
          {codeExamples.map((item, index) => (
            <button key={item.language} type="button" aria-pressed={active === index}
              onClick={() => setActive(index)}>
              <img
                className={styles.languageIcon}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${languageIcons[item.language]}`}
                alt=""
                width={18}
                height={18}
              />
              {item.language}
            </button>
          ))}
        </div>
      </div>
      <div ref={panelsRef} className={styles.panels}>
        <pre id={editorId} className={styles.editor} style={{ height: editorHeight }}
          tabIndex={0} aria-label={`${example.language} example`}>
          <HighlightedCode code={example.code} />
        </pre>
        <div {...separatorProps} className={styles.separator} style={{ height: DIVIDER_HEIGHT }} aria-controls={editorId}
          aria-label="Resize code and terminal panels"
          title="Drag to resize. Use Up/Down arrows, Home/End, or double-click to reset." />
        <div className={styles.terminal} role="region" aria-label="Terminal output" tabIndex={0}>
          <div className={styles.terminalTitle}>TERMINAL</div>
          <div className={styles.command}>$ {example.command}</div>
          <div className={styles.output}>{example.output}</div>
        </div>
      </div>
    </section>
  );
};

export default CodeDemo;
