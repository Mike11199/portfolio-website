import styles from "./CodeDemo.module.css";

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


const HighlightedCode = ({ code }: { code: string }) => {
  return <code>{highlight(code)}</code>;
};

export default HighlightedCode;
