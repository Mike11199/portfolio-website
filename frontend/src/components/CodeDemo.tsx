import { useEffect, useState } from "react";
import { codeExamples } from "./codeExamples";
import styles from "./CodeDemo.module.css";

// These curated snippets are displayed as text, never evaluated in the browser.
const highlight = (code: string) => code.split(/(\$?"[^"\n]*"|`[^`]*`|\b(?:using|var|foreach|in|new|const|for|of|if)\b|\b(?:System|Console|WriteLine|Where|Contains|print|filter|includes|console|log)\b)/g)
  .map((token, index) => {
    const kind = /^(\$?"|`)/.test(token) ? "string" : /^(foreach|in|for|of|if)$/.test(token) ? "control" : /^(using|var|new|const)$/.test(token) ? "keyword" : /^(System|Console)$/.test(token) ? "type" : /^(System|Console|WriteLine|Where|Contains|print|filter|includes|console|log)$/.test(token) ? "symbol" : "plain";
    return <span key={index} className={styles[kind]}>{token}</span>;
  });

const CodeDemo = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const example = codeExamples[active];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!preference.matches);
    const change = () => setPlaying(!preference.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (stage === 0) setStage(1);
      else {
        setActive(index => (index + 1) % codeExamples.length);
        setStage(0);
      }
    }, stage === 0 ? 2200 : 5800);
    return () => window.clearTimeout(timer);
  }, [playing, stage, active]);

  return (
    <section className={styles.demo} aria-label="Code demo">
      <div className={styles.toolbar}>
        <div className={styles.languages} role="group" aria-label="Example language">
          {codeExamples.map((item, index) => (
            <button key={item.language} type="button" aria-pressed={active === index}
              onClick={() => { setActive(index); setStage(1); setPlaying(false); }}>
              {item.language}
            </button>
          ))}
        </div>
        <button type="button" className={styles.playback} onClick={() => setPlaying(value => !value)}
          aria-label={playing ? "Pause code demo" : "Play code demo"}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className={styles.filename}>Code demo · {example.file}</div>
      <pre className={styles.editor} tabIndex={0} aria-label={`${example.language} example`}><code>{highlight(example.code)}</code></pre>
      <div className={styles.terminal}>
        <div className={styles.terminalTitle}>TERMINAL</div>
        <div className={styles.command}>$ {example.command}</div>
        <div className={styles.output}>{stage === 1 || !playing ? example.output : "�"}</div>
      </div>
    </section>
  );
};

export default CodeDemo;
