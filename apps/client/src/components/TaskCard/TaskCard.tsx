import type { Task } from "../../types/workspace";
import s from "./TaskCard.module.css";

interface TaskProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskProps) => {
  return (
    <div className={s.card}>
      <span className={s.title}>{task.title}</span>

      <div className={s.actions}>
        <button type="button" onClick={onEdit} className={s.editButton}>
          Edit
        </button>

        <button type="button" onClick={onDelete} className={s.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
