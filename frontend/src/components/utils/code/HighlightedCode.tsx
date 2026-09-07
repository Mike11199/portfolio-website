import { useMemo } from "react";
import { highlightCode } from "./highlighting";
import "highlight.js/styles/vs2015.css";

interface HighlightedCodeProps {
  code: string;
  language?: string;
}

const HighlightedCode = ({ code, language = "text" }: HighlightedCodeProps) => {
  const markup = useMemo(() => highlightCode(code, language), [code, language]);
  return <code className="hljs" dangerouslySetInnerHTML={{ __html: markup }} />;
};

export default HighlightedCode;
