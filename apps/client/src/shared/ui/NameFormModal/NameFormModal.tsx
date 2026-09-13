import { useState } from "react";
import Modal from "../Modal/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import NameForm, { type NameFormSchema } from "../NameForm/NameForm";

interface NameFormModalProps {
  isOpen: boolean;
  title: string;
  initialValue?: string;
  submitText: string;
  confirmText: string;
  confirmMessage: (name: string) => string;
  schema: NameFormSchema;
  onConfirm: (name: string) => void;
  onClose: () => void;
}

const NameFormModal = ({
  isOpen,
  title,
  initialValue = "",
  submitText,
  confirmText,
  confirmMessage,
  schema,
  onConfirm,
  onClose,
}: NameFormModalProps) => {
  const [pendingName, setPendingName] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

  const handleSubmit = (name: string) => {
    setPendingName(name);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    onConfirm(pendingName);

    setPendingName("");
    setIsConfirmOpen(false);
    onClose();
  };

  const handleCloseConfirm = () => {
    setPendingName("");
    setIsCloseConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={title}
        onClose={() => setIsCloseConfirmOpen(true)}
      >
        <NameForm
          initialValue={initialValue}
          submitText={submitText}
          schema={schema}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title={title}
        message={confirmMessage(pendingName)}
        confirmText={confirmText}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <ConfirmModal
        isOpen={isCloseConfirmOpen}
        title="Close modal"
        message="Are you sure you want to close this form?"
        confirmText="Close"
        onConfirm={handleCloseConfirm}
        onCancel={() => setIsCloseConfirmOpen(false)}
      />
    </>
  );
};

export default NameFormModal;
