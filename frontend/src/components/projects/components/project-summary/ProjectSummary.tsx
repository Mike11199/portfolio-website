import { useEffect, useId, useRef } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ParagraphCarousel from "../../../utils/paragraph-carousel/ParagraphCarousel";
import FileDivider from "../../../utils/text-decoration/FileDivider";
import HexFooter from "../../../utils/text-decoration/HexFooter";
import styles from "./ProjectSummary.module.css";
import type { ProjectContent } from "./ProjectSummary.types";

export default function ProjectSummary({ content, description }: { content: ProjectContent; description: string[] }) {
  const isMobile = useWindowWidth() <= 600;
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const mobileEntry = useRef(false);
  const closing = useRef(false);
  const pageScroll = useRef({ x: 0, y: 0 });
  const trigger = useRef<HTMLButtonElement>(null);
  const historyKey = "portfolioTechnicalDetails";

  useEffect(() => {
    const handlePopState = () => {
      if (window.history.state?.[historyKey] === titleId) {
        mobileEntry.current = true;
        closing.current = false;
        if (!dialog.current?.open) dialog.current?.showModal();
      } else if (mobileEntry.current) {
        mobileEntry.current = false;
        closing.current = false;
        dialog.current?.close();
        trigger.current?.focus({ preventScroll: true });
        // Run after the browser restores the previous history entry's scroll.
        window.setTimeout(() => window.scrollTo({
          left: pageScroll.current.x, top: pageScroll.current.y, behavior: "instant",
        }), 0);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [titleId]);

  const openDetails = () => {
    if (dialog.current?.open || closing.current) return;
    pageScroll.current = { x: window.scrollX, y: window.scrollY };
    if (window.matchMedia("(max-width: 600px)").matches) {
      window.history.pushState({ ...window.history.state, [historyKey]: titleId }, "");
      mobileEntry.current = true;
    }
    dialog.current?.showModal();
  };

  const closeDetails = () => {
    if (closing.current) return;
    if (mobileEntry.current && window.history.state?.[historyKey] === titleId) {
      closing.current = true;
      window.history.back();
    } else {
      dialog.current?.close();
    }
  };
  const text = description.join("\n\n");
  const detailsButton = (
    <button ref={trigger} type="button" className={styles.detailsButton} aria-haspopup="dialog"
      onClick={openDetails}>Technical details ↗</button>
  );
  return <>
    {isMobile ? (
      <div className={styles.mobileSummary}>
        <ParagraphCarousel
          paragraphs={content.highlights.map(({ text }) => text)}
          label="project.txt"
          navigationLabel="project summary"
          minHeight="390px"
          renderParagraph={(text, index) => <article>
            <h3>{content.highlights[index].heading}</h3><p>{text}</p>
          </article>}
          footer={detailsButton}
        />
      </div>
    ) : (
    <div className={styles.highlights} role="region" aria-label={`${content.title} summary`} tabIndex={0}>
      <FileDivider label="project.txt" hexText={description[0]} />
      {content.highlights.map(({ heading, text }) => <article key={heading}>
        <h3>{heading}</h3><p>{text}</p>
      </article>)}
      {detailsButton}
      <HexFooter text={text} fillOnly />
    </div>
    )}
    <dialog ref={dialog} className={styles.detailsDialog} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); closeDetails(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) closeDetails();
      }}>
      <div className={styles.dialogHeader}>
        <h2 id={titleId}>{content.title} — Technical details</h2>
        <button type="button" className={styles.closeButton} onClick={closeDetails} autoFocus>
          <span className={styles.desktopClose}>Close</span>
          <span className={styles.mobileBack}>← Back to project</span>
        </button>
      </div>
      <div className={styles.detailContent} tabIndex={0} role="region" aria-label="Technical details content">
        <FileDivider label="technical_details.txt" hexText={text} />
        {content.detailGroups.map(({ heading, paragraphs }) => (
          <section className={styles.detailGroup} key={heading}>
            <h3>{heading}</h3>
            <ul className={styles.detailList}>
              {paragraphs.map((index) => <li key={index}>{description[index]}</li>)}
            </ul>
          </section>
        ))}
        <FileDivider label="end of file" showCursor={false} />
      </div>
    </dialog>
  </>;
}
