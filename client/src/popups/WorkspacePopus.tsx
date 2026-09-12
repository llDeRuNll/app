import ConfirmModal from "../shared/ui/ConfirmModal/ConfirmModal";
import NameFormModal from "../shared/ui/NameFormModal/NameFormModal";

import { boardSchema } from "../schemas/boardSchema";
import { workspaceSchema } from "../schemas/workspaceSchema";

import usePopupStore from "../stores/popupStore";
import useWorkspaceStore from "../stores/workspaceStore";

export const CreateWorkspacePopup = () => {
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  const closePopup = usePopupStore((state) => state.closePopup);

  return (
    <NameFormModal
      isOpen
      title="Create workspace"
      submitText="Create"
      confirmText="Create"
      schema={workspaceSchema}
      confirmMessage={(name) => `Create workspace "${name}"?`}
      onConfirm={addWorkspace}
      onClose={closePopup}
    />
  );
};

export const EditWorkspacePopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const closePopup = usePopupStore((state) => state.closePopup);

  const editWorkspace = useWorkspaceStore((state) => state.editWorkspace);

  const workspace = useWorkspaceStore((state) =>
    state.data.workspaces.find((workspace) => workspace.id === workspaceId),
  );

  if (!workspaceId || !workspace) {
    return null;
  }

  const handleEdit = (name: string) => {
    editWorkspace(workspaceId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Edit workspace"
      initialValue={workspace.name}
      submitText="Save"
      confirmText="Save"
      schema={workspaceSchema}
      confirmMessage={(name) => `Change workspace name to "${name}"?`}
      onConfirm={handleEdit}
      onClose={closePopup}
    />
  );
};

export const DeleteWorkspacePopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const handleAccept = usePopupStore((state) => state.handleAccept);

  const handleDismiss = usePopupStore((state) => state.handleDismiss);

  const workspace = useWorkspaceStore((state) =>
    state.data.workspaces.find((workspace) => workspace.id === workspaceId),
  );

  if (!workspace) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen
      title="Delete workspace"
      message={`Are you sure you want to delete "${workspace.name}"?`}
      confirmText="Delete"
      onConfirm={handleAccept}
      onCancel={handleDismiss}
    />
  );
};

export const CreateBoardPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const closePopup = usePopupStore((state) => state.closePopup);

  const addBoard = useWorkspaceStore((state) => state.addBoard);

  if (!workspaceId) {
    return null;
  }

  const handleCreate = (name: string) => {
    addBoard(workspaceId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Create column"
      submitText="Create"
      confirmText="Create"
      schema={boardSchema}
      confirmMessage={(name) => `Create column "${name}"?`}
      onConfirm={handleCreate}
      onClose={closePopup}
    />
  );
};

export const EditBoardPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const boardId = usePopupStore((state) => state.metadata?.boardId);

  const closePopup = usePopupStore((state) => state.closePopup);

  const editBoard = useWorkspaceStore((state) => state.editBoard);

  const board = useWorkspaceStore((state) =>
    state.data.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.boards.find((board) => board.id === boardId),
  );

  if (!workspaceId || !boardId || !board) {
    return null;
  }

  const handleEdit = (name: string) => {
    editBoard(workspaceId, boardId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Edit column"
      initialValue={board.name}
      submitText="Save"
      confirmText="Save"
      schema={boardSchema}
      confirmMessage={(name) => `Change column name to "${name}"?`}
      onConfirm={handleEdit}
      onClose={closePopup}
    />
  );
};

export const DeleteBoardPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const boardId = usePopupStore((state) => state.metadata?.boardId);

  const handleAccept = usePopupStore((state) => state.handleAccept);

  const handleDismiss = usePopupStore((state) => state.handleDismiss);

  const board = useWorkspaceStore((state) =>
    state.data.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.boards.find((board) => board.id === boardId),
  );

  if (!board) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen
      title="Delete column"
      message={`Are you sure you want to delete "${board.name}"?`}
      confirmText="Delete"
      onConfirm={handleAccept}
      onCancel={handleDismiss}
    />
  );
};
