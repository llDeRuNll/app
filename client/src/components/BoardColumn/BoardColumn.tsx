import type { Board } from "../../types/workspace";
import TaskCard from "../TaskCard/TaskCard";
import s from "./BoardColumn.module.css";

interface BoardProps {
  board: Board;
}

const BoardColumn = ({ board }: BoardProps) => {
  return (
    <div className={s.board}>
      <h2 className={s.title}>{board.name}</h2>
      <div className={s.tasks}>
        {board.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
