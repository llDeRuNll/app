import type { Workspace } from "../../types/workspace";
import BoardColumn from "../BoardColumn/BoardColumn";
import s from "./WorkspaceView.module.css";

interface WorkspaceViewProps {
  workspace: Workspace;
  onEditBoard: (boardId: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onReorderBoard: (fromIndex: number, toIndex: number) => void;
  onAddTask: (boardId: string) => void;
}

const WorkspaceView = ({
  workspace,
  onEditBoard,
  onDeleteBoard,
  onReorderBoard,
  onAddTask,
}: WorkspaceViewProps) => {
  return (
    <div className={s.workspace}>
      <h1 className={s.title}>{workspace.name}</h1>
      <div className={s.boards}>
        {workspace.boards.map((board, index) => (
          <BoardColumn
            key={board.id}
            board={board}
            onEdit={() => onEditBoard(board.id)}
            onDelete={() => onDeleteBoard(board.id)}
            onAddTask={() => onAddTask(board.id)}
            onMoveLeft={() => onReorderBoard(index, index - 1)}
            onMoveRight={() => onReorderBoard(index, index + 1)}
            canMoveLeft={index > 0}
            canMoveRight={index < workspace.boards.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceView;
