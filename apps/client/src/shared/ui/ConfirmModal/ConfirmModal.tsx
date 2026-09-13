import Modal from "../Modal/Modal";
import s from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
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
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className={s.message}>{message}</p>

      <div className={s.actions}>
        <button type="button" className={s.cancelButton} onClick={onCancel}>
          {cancelText}
        </button>

        <button type="button" className={s.confirmButton} onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
