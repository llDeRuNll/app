import { memo } from "react";
import type { Workspace } from "../../types/workspace";
import BoardColumn from "../BoardColumn/BoardColumn";
import s from "./WorkspaceView.module.css";

interface WorkspaceViewProps {
  workspace: Workspace;
  onEditBoard: (boardId: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onReorderBoard: (fromIndex: number, toIndex: number) => Promise<void>;
  onAddTask: (boardId: string) => Promise<void>;
  onEditTask: (boardId: string, taskId: string) => void;
  onDeleteTask: (boardId: string, taskId: string) => void;
}

const WorkspaceView = ({
  workspace,
  onEditBoard,
  onDeleteBoard,
  onReorderBoard,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: WorkspaceViewProps) => {
  return (
    <div className={s.workspace}>
      <h1 className={s.title}>{workspace.name}</h1>
      <div className={s.boards}>
        {workspace.boards.map((board, index) => (
          <BoardColumn
            key={board.id}
            board={board}
            index={index}
            boardsCount={workspace.boards.length}
            onEditBoard={onEditBoard}
            onDeleteBoard={onDeleteBoard}
            onAddTask={onAddTask}
            onReorderBoard={onReorderBoard}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(WorkspaceView);
