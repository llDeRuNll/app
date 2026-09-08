import type { Workspace } from "../../types/workspace";
import BoardColumn from "../BoardColumn/BoardColumn";
import s from "./WorkspaceView.module.css";

interface WorkspaceViewProps {
  workspace: Workspace;
}

const WorkspaceView = ({ workspace }: WorkspaceViewProps) => {
  return (
    <div className={s.workspace}>
      <h1 className={s.title}>{workspace.name}</h1>
      <div className={s.boards}>
        {workspace.boards.map((board) => (
          <BoardColumn key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceView;
