import s from "./WorkspacePage.module.css";
import WorkspaceList from "../../components/WorkspaceList/WorkSpaceList";
import WorkspaceView from "../../components/WorkspaceView/WorkSpaceView";
import useWorkspaceState from "../../hooks/useWorkspaceState";
import useWorkspaceSelection from "../../hooks/useWorkspaceSelection";
import useWorkspaceModal from "../../hooks/useWorkspaceModal";
import NameFormModal from "../../shared/ui/NameFormModal/NameFormModal";
import { validateWorkspaceName } from "../../utils/validateWorkspaceName";
import ConfirmModal from "../../shared/ui/ConfirmModal/ConfirmModal";

const WorkspacePage = () => {
  const {
    data,
    addTask,
    addWorkspace,
    editWorkspace,
    deleteWorkspace,
    addBoard,
    editBoard,
    deleteBoard,
    reorderBoards,
  } = useWorkspaceState();

  const { selectWorkspace, selectedWorkspaceId, selectedWorkspace } =
    useWorkspaceSelection(data.workspaces);
  const {
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,
    isCreateBoardOpen,
    isEditBoardOpen,
    isDeleteBoardOpen,
    activeBoardId,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    openCreateBoardModal,
    openEditBoardModal,
    openDeleteBoardModal,
    closeModal,
  } = useWorkspaceModal();

  const handleEditWorkspace = (name: string) => {
    if (!selectedWorkspace) return;

    editWorkspace(selectedWorkspace.id, name);
  };

  const handleDeleteWorkspace = () => {
    if (!selectedWorkspace) return;

    deleteWorkspace(selectedWorkspace.id);
    closeModal();
  };

  const handleAddTask = (boardId: string) => {
    if (!selectedWorkspace) return;

    addTask(selectedWorkspace.id, boardId, "New task");
  };

  const handleReorderBoard = (fromIndex: number, toIndex: number) => {
    if (!selectedWorkspace) return;

    reorderBoards(selectedWorkspace.id, fromIndex, toIndex);
  };

  const activeBoard = selectedWorkspace?.boards.find(
    (board) => board.id === activeBoardId,
  );

  return (
    <div className={s.workspacePage}>
      <div className={s.actions}>
        <button
          type="button"
          className={`${s.actionButton} ${s.primaryButton}`}
          onClick={openCreateModal}
        >
          Add workspace
        </button>

        <button
          type="button"
          className={`${s.actionButton} ${s.primaryButton}`}
          onClick={openCreateBoardModal}
          disabled={!selectedWorkspace}
        >
          Add column
        </button>

        <button
          type="button"
          className={`${s.actionButton} ${s.secondaryButton}`}
          onClick={openEditModal}
          disabled={!selectedWorkspace}
        >
          Edit workspace
        </button>

        <button
          type="button"
          className={`${s.actionButton} ${s.dangerButton}`}
          onClick={openDeleteModal}
          disabled={!selectedWorkspace}
        >
          Delete workspace
        </button>
      </div>
      <WorkspaceList
        workspaces={data.workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelect={selectWorkspace}
      />
      {selectedWorkspace && (
        <WorkspaceView
          workspace={selectedWorkspace}
          onEditBoard={openEditBoardModal}
          onDeleteBoard={openDeleteBoardModal}
          onReorderBoard={handleReorderBoard}
          onAddTask={handleAddTask}
        />
      )}
      <NameFormModal
        isOpen={isCreateOpen}
        title="Create workspace"
        submitText="Create"
        confirmText="Create"
        validate={validateWorkspaceName}
        confirmMessage={(name) => `Create workspace "${name}"?`}
        onConfirm={addWorkspace}
        onClose={closeModal}
      />

      <NameFormModal
        isOpen={isEditOpen}
        title="Edit workspace"
        initialValue={selectedWorkspace?.name}
        submitText="Save"
        confirmText="Save"
        validate={validateWorkspaceName}
        confirmMessage={(name) => `Change workspace name to "${name}"?`}
        onConfirm={handleEditWorkspace}
        onClose={closeModal}
      />
      <NameFormModal
        isOpen={isCreateBoardOpen}
        title="Create column"
        submitText="Create"
        confirmText="Create"
        confirmMessage={(name) => `Create column "${name}"?`}
        onConfirm={(name) => {
          if (!selectedWorkspace) return;

          addBoard(selectedWorkspace.id, name);
        }}
        onClose={closeModal}
      />
      <NameFormModal
        isOpen={isEditBoardOpen}
        title="Edit column"
        initialValue={activeBoard?.name}
        submitText="Save"
        confirmText="Save"
        confirmMessage={(name) => `Change column name to "${name}"?`}
        onConfirm={(name) => {
          if (!selectedWorkspace || !activeBoardId) return;

          editBoard(selectedWorkspace.id, activeBoardId, name);
        }}
        onClose={closeModal}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete workspace"
        message={
          selectedWorkspace
            ? `Are you sure you want to delete "${selectedWorkspace.name}"?`
            : ""
        }
        confirmText="Delete"
        onConfirm={handleDeleteWorkspace}
        onCancel={closeModal}
      />
      <ConfirmModal
        isOpen={isDeleteBoardOpen}
        title="Delete column"
        message={
          activeBoard
            ? `Are you sure you want to delete "${activeBoard.name}"?`
            : ""
        }
        confirmText="Delete"
        onConfirm={() => {
          if (!selectedWorkspace || !activeBoardId) return;

          deleteBoard(selectedWorkspace.id, activeBoardId);
          closeModal();
        }}
        onCancel={closeModal}
      />
    </div>
  );
};

export default WorkspacePage;
