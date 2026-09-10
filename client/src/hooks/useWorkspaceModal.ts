import { useState } from "react";

type WorkspaceModal =
  | "createWorkspace"
  | "editWorkspace"
  | "deleteWorkspace"
  | "createBoard"
  | "editBoard"
  | "deleteBoard"
  | null;

const useWorkspaceModal = () => {
  const [activeModal, setActiveModal] = useState<WorkspaceModal>(null);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);

  const openCreateModal = () => {
    setActiveModal("createWorkspace");
  };

  const openEditModal = () => {
    setActiveModal("editWorkspace");
  };

  const openDeleteModal = () => {
    setActiveModal("deleteWorkspace");
  };

  const openCreateBoardModal = () => {
    setActiveModal("createBoard");
  };
  const openEditBoardModal = (boardId: string) => {
    setActiveBoardId(boardId);
    setActiveModal("editBoard");
  };

  const openDeleteBoardModal = (boardId: string) => {
    setActiveBoardId(boardId);
    setActiveModal("deleteBoard");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return {
    isCreateOpen: activeModal === "createWorkspace",
    isEditOpen: activeModal === "editWorkspace",
    isDeleteOpen: activeModal === "deleteWorkspace",
    isCreateBoardOpen: activeModal === "createBoard",
    isEditBoardOpen: activeModal === "editBoard",
    isDeleteBoardOpen: activeModal === "deleteBoard",
    activeBoardId,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    openCreateBoardModal,
    openEditBoardModal,
    openDeleteBoardModal,
    closeModal,
  };
};

export default useWorkspaceModal;
