import { useMemo } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

type HighlightedCodeProps = {
  code: string;
  language?: string;
};

// Keep the labels used by the portfolio data separate from Highlight.js's
// language names. Unknown labels intentionally fall back to plain text so the
// code is still readable when a new project uses an unsupported language.
const languageAliases: Record<string, string> = {
  bash: "shell",
  "c#": "csharp",
  docker: "dockerfile",
  "gitlab ci": "yaml",
  html: "xml",
  postgresql: "sql",
  text: "plaintext",
};

const getHighlightLanguage = (language: string | undefined) => {
  const normalizedLanguage = language?.trim().toLowerCase() || "text";
  return languageAliases[normalizedLanguage] ?? normalizedLanguage;
};

const HighlightedCode = ({ code, language = "text" }: HighlightedCodeProps) => {
  const highlightedMarkup = useMemo(() => {
    const syntaxLanguage = getHighlightLanguage(language);

    try {
      return hljs.highlight(code, {
        language: syntaxLanguage,
        ignoreIllegals: true,
      }).value;
    } catch {
      // Plaintext is always registered by Highlight.js and still escapes
      // the source safely if a future language label is not recognized.
      return hljs.highlight(code, {
        language: "plaintext",
        ignoreIllegals: true,
      }).value;
    }
  }, [code, language]);

  return (
    <code
      className="hljs"
      dangerouslySetInnerHTML={{ __html: highlightedMarkup }}
    />
  );
};

export default HighlightedCode;
