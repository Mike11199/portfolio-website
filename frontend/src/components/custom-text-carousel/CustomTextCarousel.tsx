import ParagraphCarousel from "../utils/paragraph-carousel/ParagraphCarousel";

interface CustomTextCarouselProps {
  descriptionList: string[];
  heightProp: string;
}

const CustomTextCarousel = ({ descriptionList, heightProp }: CustomTextCarouselProps) => (
  <ParagraphCarousel
    paragraphs={descriptionList}
    label="project.txt"
    navigationLabel="project"
    minHeight={heightProp}
    renderParagraph={(text) => <ul><li className="listTextItem">{text}</li></ul>}
  />
);

export default CustomTextCarousel;
