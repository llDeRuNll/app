import type { Task } from "../../types/workspace";
import s from "./TaskCard.module.css";

interface TaskProps {
  task: Task;
}

const TaskCard = ({ task }: TaskProps) => {
  return <div className={s.card}>{task.title}</div>;
};

export default TaskCard;
