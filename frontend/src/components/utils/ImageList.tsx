import ProjectMediaSlide, { type ProjectMedia } from "./ProjectMediaSlide";

// Existing image manifests can also supply video slides and still thumbnails.
const ImagesList = (images: ProjectMedia[]) => (
  images.map((image) => (
    <ProjectMediaSlide key={image.src} media={image} />
  ))
);

export default ImagesList;
