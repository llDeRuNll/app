import s from "./WorkspacePage.module.css";
import WorkspaceList from "../../components/WorkspaceList/WorkSpaceList";
import WorkspaceView from "../../components/WorkspaceView/WorkSpaceView";
import useWorkspaceSelection from "../../hooks/useWorkspaceSelection";
import useWorkspaceStore from "../../stores/workspaceStore";
import useWorkspaceActions from "../../hooks/useWorkspaceActions";
import PopupRenderer from "../../popups/PopupRenderer";

const WorkspacePage = () => {
  const workspaces = useWorkspaceStore((state) => state.data.workspaces);

  const { selectedWorkspaceId, selectedWorkspace, selectWorkspace } =
    useWorkspaceSelection(workspaces);

  const {
    handleCreateWorkspace,
    handleEditWorkspace,
    handleDeleteWorkspace,
    handleCreateBoard,
    handleEditBoard,
    handleDeleteBoard,
    handleReorderBoard,
    handleAddTask,
  } = useWorkspaceActions(selectedWorkspaceId);

  return (
    <div className={s.workspacePage}>
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
      </div>
      <WorkspaceList
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelect={selectWorkspace}
      />
      {selectedWorkspace && (
        <WorkspaceView
          workspace={selectedWorkspace}
          onEditBoard={handleEditBoard}
          onDeleteBoard={handleDeleteBoard}
          onReorderBoard={handleReorderBoard}
          onAddTask={handleAddTask}
        />
      )}

      <PopupRenderer />
    </div>
  );
};

export default WorkspacePage;
