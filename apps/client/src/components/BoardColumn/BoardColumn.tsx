import { memo } from "react";
import type { Board } from "../../types/workspace";
import TaskCard from "../TaskCard/TaskCard";
import s from "./BoardColumn.module.css";

interface BoardProps {
  board: Board;
  index: number;
  boardsCount: number;
  onEditBoard: (boardId: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onAddTask: (boardId: string) => void;
  onReorderBoard: (fromIndex: number, toIndex: number) => void;
}

const BoardColumn = ({
  board,
  index,
  boardsCount,
  onEditBoard,
  onDeleteBoard,
  onReorderBoard,
  onAddTask,
}: BoardProps) => {
  const canMoveLeft = index > 0;
  const canMoveRight = index < boardsCount - 1;
  return (
    <div className={s.board}>
      <div className={s.header}>
        <h2 className={s.title}>{board.name}</h2>
        <div className={s.actions}>
          <button
            type="button"
            onClick={() => onEditBoard(board.id)}
            className={s.editButton}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDeleteBoard(board.id)}
            className={s.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={s.tasks}>
        {board.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <button
        type="button"
        className={s.addTaskButton}
        onClick={() => onAddTask(board.id)}
      >
        + Add task
      </button>
      <div className={s.reorderActions}>
        <button
          type="button"
          className={s.moveButton}
          onClick={() => onReorderBoard(index, index - 1)}
          disabled={!canMoveLeft}
          aria-label="Move column left"
        >
          ←
        </button>

        <button
          type="button"
          className={s.moveButton}
          onClick={() => onReorderBoard(index, index + 1)}
          disabled={!canMoveRight}
          aria-label="Move column right"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default memo(BoardColumn);
