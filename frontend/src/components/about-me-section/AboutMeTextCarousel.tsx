import { useWindowWidth } from "@react-hook/window-size";
import { TypeAnimation } from "react-type-animation";
import HexFooter from "../utils/text-decoration/HexFooter";
import FileDivider from "../utils/text-decoration/FileDivider";
import ParagraphCarousel from "../utils/paragraph-carousel/ParagraphCarousel";
import styles from "./AboutMeTextCarousel.module.css";
import "../custom-text-carousel/CustomTextCarousel.css";

interface AboutMeTextCarouselProps {
  descriptionList: string[];
  heightProp: string;
}

const AboutMeTextCarousel = ({ descriptionList, heightProp }: AboutMeTextCarouselProps) => {
  const isMobile = useWindowWidth() <= 600;
  const decorationText = descriptionList.join("\n\n");

  if (isMobile) {
    return (
      <ParagraphCarousel
        paragraphs={descriptionList}
        label="about_me.txt"
        navigationLabel="introduction"
        minHeight={heightProp}
        renderParagraph={(text, index) => <>{index === 0 && <p>Hello!</p>}<p>{text}</p></>}
      />
    );
  }

  return (
    <div className="normal-text-desktop-view">
      <div className={`textWrapperDesktop ${styles.desktopText}`}>
        <div className={styles.bio}>
          <FileDivider label="about_me.txt" hexText={decorationText} />
          <div className={styles.greeting}>
            <TypeAnimation
              cursor
              speed={{ type: "keyStrokeDelayInMs", value: 750 }}
              sequence={["Hello! "]}
            />
          </div>
          {descriptionList.map((text) => <p key={text}>{text}</p>)}
        </div>
        <HexFooter text={decorationText} />
      </div>
    </div>
  );
};

export default AboutMeTextCarousel;
