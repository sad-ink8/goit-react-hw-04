import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ modalIsOpen, closeModal, image }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Choosen image"
        className={css.Modal}
        overlayClassName={css.Overlay}
      >
        <div className={css.ModalImgContainer}>
          <img src={image.modal} alt="Choosen image" className={css.ImgModal} />
          <p className={css.author}>{image.author}</p>
        </div>
      </Modal>
    </div>
  );
}
