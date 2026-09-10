import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div
        className={s.modal}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
      >
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>

          <button
            type="button"
            className={s.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        <div className={s.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
