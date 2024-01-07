interface Image {
  alt: string;
  src: string;
}

// Return list of image elements for React Carousel
const ImagesList = (images: Image[]) => (
  images.map((image, index) => (
    <div key={index}>
      <img alt={image.alt} src={image.src} />
    </div>
  ))
);

export default ImagesList;