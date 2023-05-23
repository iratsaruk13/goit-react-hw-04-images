import { useState } from "react";
import { GalleryImage, GalleryItem } from "./ImageGalleryItem.styled";
import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({
  img: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GalleryItem onClick={openModal}>
        <GalleryImage src={webformatURL} alt={tags}></GalleryImage>
      </GalleryItem>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
};
