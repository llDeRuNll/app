import s from "./WorkspacePage.module.css";
import WorkspaceList from "../../components/WorkspaceList/WorkSpaceList";
import WorkspaceView from "../../components/WorkspaceView/WorkSpaceView";
import useWorkspaceState from "../../hooks/useWorkspaceState";
import useWorkspaceSelection from "../../hooks/useWorkspaceSelection";

const WorkspacePage = () => {
  const { data } = useWorkspaceState();

  const { selectWorkspace, selectedWorkspaceId, selectedWorkspace } =
    useWorkspaceSelection(data.workspaces);

  return (
    <div className={s.workspacePage}>
      <WorkspaceList
        workspaces={data.workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelect={selectWorkspace}
      />
      {selectedWorkspace && <WorkspaceView workspace={selectedWorkspace} />}
    </div>
  );
};

export default WorkspacePage;
