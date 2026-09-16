import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onConfirm();
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={isSubmitting ? () => undefined : onCancel}
    >
      <p className={s.message}>{message}</p>

      <div className={s.actions}>
        <button
          type="button"
          className={s.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelText}
        </button>

        <button
          type="button"
          className={s.confirmButton}
          onClick={() => {
            void handleConfirm();
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
