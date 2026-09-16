import ConfirmModal from "../shared/ui/ConfirmModal/ConfirmModal";
import NameFormModal from "../shared/ui/NameFormModal/NameFormModal";

import { boardSchema } from "../schemas/boardSchema";
import { workspaceSchema } from "../schemas/workspaceSchema";

import usePopupStore from "../stores/popupStore";
import useWorkspaceStore from "../stores/workspaceStore";
import { taskSchema } from "../schemas/taskSchema";

export const CreateWorkspacePopup = () => {
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  const closePopup = usePopupStore((state) => state.closePopup);

  const handleCreate = async (name: string) => {
    await addWorkspace(name);
  };
  return (
    <NameFormModal
      isOpen
      title="Create workspace"
      submitText="Create"
      confirmText="Create"
      placeholder="Enter workspace title"
      schema={workspaceSchema}
      confirmMessage={(name) => `Create workspace to"${name}"?`}
      onConfirm={handleCreate}
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

  const handleEdit = async (name: string) => {
    await editWorkspace(workspaceId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Edit workspace"
      initialValue={workspace.name}
      submitText="Save"
      confirmText="Save"
      placeholder="Change workspace title"
      schema={workspaceSchema}
      confirmMessage={(name) => `Change workspace title to "${name}"?`}
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

  const handleCreate = async (name: string) => {
    await addBoard(workspaceId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Create column"
      submitText="Create"
      confirmText="Create"
      placeholder="Enter column title"
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

  const handleEdit = async (name: string) => {
    await editBoard(workspaceId, boardId, name);
  };

  return (
    <NameFormModal
      isOpen
      title="Edit column"
      initialValue={board.name}
      submitText="Save"
      confirmText="Save"
      placeholder="Edit column title"
      schema={boardSchema}
      confirmMessage={(name) => `Change column title to "${name}"?`}
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

export const CreateTaskPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const boardId = usePopupStore((state) => state.metadata?.boardId);

  const closePopup = usePopupStore((state) => state.closePopup);

  const addTask = useWorkspaceStore((state) => state.addTask);

  if (!workspaceId || !boardId) {
    return null;
  }

  const handleCreate = async (title: string) => {
    await addTask(workspaceId, boardId, title);
  };

  return (
    <NameFormModal
      isOpen
      title="Create task"
      submitText="Create"
      confirmText="Create"
      schema={taskSchema}
      placeholder="Create a task"
      confirmMessage={(title) => `Create task "${title}"?`}
      onConfirm={handleCreate}
      onClose={closePopup}
    />
  );
};

export const EditTaskPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const boardId = usePopupStore((state) => state.metadata?.boardId);

  const taskId = usePopupStore((state) => state.metadata?.taskId);

  const closePopup = usePopupStore((state) => state.closePopup);

  const editTask = useWorkspaceStore((state) => state.editTask);

  const task = useWorkspaceStore((state) =>
    state.data.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.boards.find((board) => board.id === boardId)
      ?.tasks.find((task) => task.id === taskId),
  );

  if (!workspaceId || !boardId || !taskId || !task) {
    return null;
  }

  const handleEdit = async (title: string) => {
    await editTask(workspaceId, boardId, taskId, title);
  };

  return (
    <NameFormModal
      isOpen
      title="Edit task"
      initialValue={task.title}
      submitText="Save"
      confirmText="Save"
      placeholder="Change a task"
      schema={taskSchema}
      confirmMessage={(title) => `Change task to "${title}"?`}
      onConfirm={handleEdit}
      onClose={closePopup}
    />
  );
};

export const DeleteTaskPopup = () => {
  const workspaceId = usePopupStore((state) => state.metadata?.workspaceId);

  const boardId = usePopupStore((state) => state.metadata?.boardId);

  const taskId = usePopupStore((state) => state.metadata?.taskId);

  const handleAccept = usePopupStore((state) => state.handleAccept);

  const handleDismiss = usePopupStore((state) => state.handleDismiss);

  const task = useWorkspaceStore((state) =>
    state.data.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.boards.find((board) => board.id === boardId)
      ?.tasks.find((task) => task.id === taskId),
  );

  if (!task) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen
      title="Delete task"
      message={`Are you sure you want to delete "${task.title}"?`}
      confirmText="Delete"
      onConfirm={handleAccept}
      onCancel={handleDismiss}
    />
  );
};
