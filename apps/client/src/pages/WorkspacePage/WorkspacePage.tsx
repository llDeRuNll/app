import s from "./WorkspacePage.module.css";
import useWorkspaceSelection from "../../hooks/useWorkspaceSelection";
import useWorkspaceStore from "../../stores/workspaceStore";
import useWorkspaceActions from "../../hooks/useWorkspaceActions";
import PopupRenderer from "../../popups/PopupRenderer";
import WorkspaceList from "../../components/WorkspaceList/WorkspaceList";
import WorkSpaceView from "../../components/WorkspaceView/WorkspaceView";
import Loader from "../../shared/Loader/Loader";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const WorkspacePage = () => {
  const workspaces = useWorkspaceStore((state) => state.data.workspaces);

  const { selectedWorkspaceId, selectedWorkspace, selectWorkspace } =
    useWorkspaceSelection(workspaces);

  const user = useAuthStore((state) => state.user);

  const isOwner = Boolean(
    selectedWorkspace && user && selectedWorkspace.ownerId === user.id,
  );

  const loadWorkspaces = useWorkspaceStore((state) => state.loadWorkspaces);

  const loadWorkspace = useWorkspaceStore((state) => state.loadWorkspace);

  const isLoading = useWorkspaceStore((state) => state.isLoading);

  const error = useWorkspaceStore((state) => state.error);
  const {
    handleCreateWorkspace,
    handleEditWorkspace,
    handleDeleteWorkspace,
    handleCreateBoard,
    handleEditBoard,
    handleDeleteBoard,
    handleReorderBoard,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
  } = useWorkspaceActions(selectedWorkspaceId);

  useEffect(() => {
    void loadWorkspaces();
  }, [loadWorkspaces]);

  useEffect(() => {
    if (!selectedWorkspaceId) {
      return;
    }

    void loadWorkspace(selectedWorkspaceId);
  }, [selectedWorkspaceId, loadWorkspace]);

  if (isLoading && workspaces.length === 0) {
    return <Loader text="Loading workspaces..." size={40} />;
  }

  if (error && workspaces.length === 0) {
    return <p>{error}</p>;
  }

  return (
    <div className={s.workspacePage}>
      <div className={s.topBar}>
        <div className={s.actions}>
          <button
            type="button"
            className={`${s.actionButton} ${s.primaryButton}`}
            onClick={handleCreateWorkspace}
          >
            Add workspace
          </button>

          <button
            type="button"
            className={`${s.actionButton} ${s.primaryButton}`}
            onClick={handleCreateBoard}
            disabled={!selectedWorkspace}
          >
            Add column
          </button>
          {isOwner && (
            <>
              <button
                type="button"
                className={`${s.actionButton} ${s.secondaryButton}`}
                onClick={handleEditWorkspace}
                disabled={!selectedWorkspace}
              >
                Edit workspace
              </button>

              <button
                type="button"
                className={`${s.actionButton} ${s.dangerButton}`}
                onClick={handleDeleteWorkspace}
                disabled={!selectedWorkspace}
              >
                Delete workspace
              </button>
            </>
          )}
        </div>
        <LogoutButton />
      </div>
      <WorkspaceList
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelect={selectWorkspace}
      />
      {selectedWorkspace && (
        <WorkSpaceView
          workspace={selectedWorkspace}
          onEditBoard={handleEditBoard}
          onDeleteBoard={handleDeleteBoard}
          onReorderBoard={handleReorderBoard}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          isOwner={isOwner}
        />
      )}

      <PopupRenderer />
    </div>
  );
};

export default WorkspacePage;
