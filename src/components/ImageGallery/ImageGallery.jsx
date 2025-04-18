import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onCardClick }) {
  return (
    <div className={css.GalleryContainer}>
      <ul className={css.ImageGallery}>
        {images.map(
          ({
            id,
            urls: { regular, small },
            alt_description,
            user: { name },
          }) => (
            <li key={id}>
              <ImageCard
                alt={alt_description || "No description available"}
                author={name}
                modal={regular}
                card={small}
                onOpen={onCardClick}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
