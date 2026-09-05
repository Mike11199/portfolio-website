import { useState } from "react";
import { codeExamples } from "./codeExamples";
import styles from "./CodeDemo.module.css";

// These curated snippets are displayed as text, never evaluated in the browser.
const keywords = /^(using|var|new|const|async|await|from|import|def|lambda|return)$/;
const controls = /^(foreach|in|for|of|if)$/;
const types = /^(System|Console|Promise)$/;
const highlight = (code: string) => code.split(/(#[^\n]*|\$?f?"[^"\n]*"|`[^`]*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g)
  .map((token, index, tokens) => {
    const kind = token.startsWith("#") ? "comment"
      : /^(\$?f?"|`)/.test(token) ? "string"
      : keywords.test(token) ? "keyword"
      : controls.test(token) ? "control"
      : types.test(token) ? "type"
      : /^\d/.test(token) ? "number"
      : /^\s*\(/.test(tokens[index + 1] ?? "") && /^\w+$/.test(token) ? "symbol"
      : "plain";
    return <span key={index} className={styles[kind]}>{token}</span>;
  });

const CodeDemo = () => {
  const [active, setActive] = useState(0);
  const example = codeExamples[active];

  return (
    <section className={styles.demo} aria-label="Code demo">
      <div className={styles.toolbar}>
        <div className={styles.languages} role="group" aria-label="Example language">
          {codeExamples.map((item, index) => (
            <button key={item.language} type="button" aria-pressed={active === index}
              onClick={() => setActive(index)}>
              {item.language}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.filename}>Code demo · {example.file}</div>
      <pre className={styles.editor} tabIndex={0} aria-label={`${example.language} example`}><code>{highlight(example.code)}</code></pre>
      <div className={styles.terminal}>
        <div className={styles.terminalTitle}>TERMINAL</div>
        <div className={styles.command}>$ {example.command}</div>
        <div className={styles.output}>{example.output}</div>
      </div>
    </section>
  );
};

export default CodeDemo;
