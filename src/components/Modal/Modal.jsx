import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeydown = (evt) => {
      if (evt.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) onClose();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    modalRoot
  );
};
