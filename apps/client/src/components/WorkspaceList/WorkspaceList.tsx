import type { Workspace } from "../../types/workspace";
import s from "./WorkspaceList.module.css";

interface WorkspaceListProps {
  workspaces: Workspace[];
  selectedWorkspaceId: string | null;
  onSelect: (id: string) => void;
}

const WorkspaceList = ({
  workspaces,
  selectedWorkspaceId,
  onSelect,
}: WorkspaceListProps) => {
  return (
    <div className={s.list}>
      {workspaces.map((workspace) => (
        <button
          key={workspace.id}
          onClick={() => onSelect(workspace.id)}
          className={
            selectedWorkspaceId === workspace.id
              ? `${s.button} ${s.active}`
              : s.button
          }
        >
          {workspace.name}
        </button>
      ))}
    </div>
  );
};

export default WorkspaceList;
