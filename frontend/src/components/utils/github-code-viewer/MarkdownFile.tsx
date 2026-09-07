import { useState, type ReactNode } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import HighlightedCode from "../code/HighlightedCode";
import styles from "./MarkdownFile.module.css";

interface Props {
  source: string;
  filePath: string;
  repositoryUrl: string;
  branch: string;
  children: ReactNode;
}

const MarkdownFile = ({ source, filePath, repositoryUrl, branch, children }: Props) => {
  const [preview, setPreview] = useState(true);
  const repositoryPath = new URL(repositoryUrl).pathname;
  const revision = encodeURIComponent(branch);
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  const pageRoot = `${repositoryUrl}/blob/${revision}/`;
  const imageRoot = `https://raw.githubusercontent.com${repositoryPath}/${revision}/`;

  const resolveUrl = (url: string, key: string) => {
    const safeUrl = defaultUrlTransform(url);
    if (!safeUrl) return "";
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(safeUrl)) return safeUrl;
    const root = key === "src" ? imageRoot : pageRoot;
    return safeUrl.startsWith("/")
      ? new URL(safeUrl.slice(1), root).href
      : new URL(safeUrl, root + encodedPath).href;
  };

  return (
    <>
      <div className={styles.toolbar} role="group" aria-label="Markdown display">
        <button type="button" aria-pressed={preview} onClick={() => setPreview(true)}><span>Preview</span></button>
        <button type="button" aria-pressed={!preview} onClick={() => setPreview(false)}><span>Source</span></button>
      </div>
      {preview ? (
        <article className={styles.markdown}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            skipHtml
            urlTransform={resolveUrl}
            components={{
              a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
              img: ({ src, alt, title }) => <img src={src} alt={alt ?? ""} title={title} loading="lazy" />,
              code: ({ className, children }) => {
                const language = /language-([\w+-]+)/.exec(className ?? "")?.[1];
                return language
                  ? <HighlightedCode code={String(children)} language={language} />
                  : <code>{children}</code>;
              },
            }}
          >{source}</Markdown>
        </article>
      ) : children}
    </>
  );
};

export default MarkdownFile;
