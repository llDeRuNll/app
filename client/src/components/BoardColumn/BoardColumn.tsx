import type { Board } from "../../types/workspace";
import TaskCard from "../TaskCard/TaskCard";
import s from "./BoardColumn.module.css";

interface BoardProps {
  board: Board;
  onEdit: () => void;
  onDelete: () => void;
  onAddTask: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

const BoardColumn = ({
  board,
  onEdit,
  onDelete,
  onMoveLeft,
  onMoveRight,
  onAddTask,
  canMoveLeft,
  canMoveRight,
}: BoardProps) => {
  return (
    <div className={s.board}>
      <div className={s.header}>
        <h2 className={s.title}>{board.name}</h2>
        <div className={s.actions}>
          <button type="button" onClick={onEdit} className={s.editButton}>
            Edit
          </button>
          <button type="button" onClick={onDelete} className={s.deleteButton}>
            Delete
          </button>
        </div>
      </div>
      <div className={s.tasks}>
        {board.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <button type="button" className={s.addTaskButton} onClick={onAddTask}>
        + Add task
      </button>
      <div className={s.reorderActions}>
        <button
          type="button"
          className={s.moveButton}
          onClick={onMoveLeft}
          disabled={!canMoveLeft}
          aria-label="Move column left"
        >
          ←
        </button>

        <button
          type="button"
          className={s.moveButton}
          onClick={onMoveRight}
          disabled={!canMoveRight}
          aria-label="Move column right"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default BoardColumn;
