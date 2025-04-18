import css from "./ImageCard.module.css";

export default function ImageCard({ alt, author, modal, card, onOpen }) {
  return (
    <div onClick={() => onOpen({ modal, author })}>
      <img src={card} alt={alt} className={css.ImgCard} />
    </div>
  );
}
