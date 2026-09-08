import { useState } from "react";
import WorkspaceView from "../../components/WorkspaceView/WorkspaceView";
import { mockData } from "../../data/mockData";
import s from "./WorkspacePage.module.css";
import WorkspaceList from "../../components/WorkspaceList/WorkspaceList";

const WorkspacePage = () => {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(
    mockData.workspaces[0].id,
  );

  const selectedWorkspace = mockData.workspaces.find(
    (workspace) => workspace.id === selectedWorkspaceId,
  );

  return (
    <div className={s.workspacePage}>
      <WorkspaceList
        workspaces={mockData.workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelect={setSelectedWorkspaceId}
      />
      {selectedWorkspace && <WorkspaceView workspace={selectedWorkspace} />}
    </div>
  );
};

export default WorkspacePage;
