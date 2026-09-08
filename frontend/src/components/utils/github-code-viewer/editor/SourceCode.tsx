import { Fragment, useMemo } from "react";
import { highlightCode } from "../../code/highlighting";
import "highlight.js/styles/vs2015.css";
import styles from "../GitHubCodeViewer.module.css";

// Highlight the whole file first so multiline strings and comments keep their syntax.
const splitHighlightedLines = (markup: string) => {
  const lines: string[] = [];
  const openSpans: string[] = [];
  let line = "";

  for (const token of markup.split(/(<span\b[^>]*>|<\/span>|\n)/)) {
    if (token === "\n") {
      lines.push(line + "</span>".repeat(openSpans.length));
      line = openSpans.join("");
      continue;
    }
    if (token.startsWith("<span")) openSpans.push(token);
    else if (token === "</span>") openSpans.pop();
    line += token;
  }
  lines.push(line);
  return lines;
};

const SourceCode = ({ source, language }: { source: string; language: string }) => {
  const lines = useMemo(() => splitHighlightedLines(highlightCode(source, language)), [source, language]);

  return (
    <div className={styles.sourceCode}>
      {lines.map((line, index) => (
        <Fragment key={index}>
          <span className={styles.lineNumbers} aria-hidden="true">{index + 1}</span>
          <pre className={styles.sourceText}>
            <code className="hljs" dangerouslySetInnerHTML={{ __html: line || " " }} />
          </pre>
        </Fragment>
      ))}
    </div>
  );
};

export default SourceCode;
