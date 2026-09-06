import { useState } from "react";
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

// These curated snippets are displayed as text, never evaluated in the browser.
const keywords = /^(using|var|let|new|const|async|await|from|import|def|lambda|return|interface|function|typeof|throw)$/;
const sqlKeywords = /^(PREPARE|AS|WITH|SELECT|FROM|WHERE|CROSS|JOIN|ORDER|BY|LIMIT|EXECUTE|WORKDIR|COPY|RUN|EXPOSE|CMD)$/;
const yamlKeys = /^(steps|name|id|uses|env|run|working|directory|stages|stage|default|tags|variables|build|deploy|script|rules|resource_group)$/;
const controls = /^(foreach|in|for|of|if|try|catch|continue)$/;
const types = /^(System|Console|Promise|BoundingBox|string|number|unknown|boolean|void|bigint)$/;
// Match triple quotes first so multiline Python docstrings stay one string token.
const highlight = (code: string) => code.split(/("""[\s\S]*?"""|'''[\s\S]*?'''|--[^\n]*|\/\/[^\n]*|#[^\n]*|\$?f?"[^"\n]*"|`[^`]*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g)
  .map((token, index, tokens) => {
    const kind = (token.startsWith("#") || token.startsWith("//") || token.startsWith("--")) ? "comment"
      : /^(\$?f?"|'''|`)/.test(token) ? "string"
      : (keywords.test(token) || sqlKeywords.test(token)) ? "keyword"
      : yamlKeys.test(token) ? "symbol"
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
