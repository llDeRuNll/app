import { useState } from "react";
import { mockData } from "../data/mockData";
import type { WorkspaceData, Workspace, Board, Task } from "../types/workspace";

const useWorkspaceState = () => {
  const [data, setData] = useState<WorkspaceData>(mockData);

  const addWorkspace = (name: string) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      boards: [],
    };
    setData((prevData) => ({
      ...prevData,
      workspaces: [...prevData.workspaces, newWorkspace],
    }));
  };

  const addBoard = (workspaceId: string, name: string) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name,
      tasks: [],
    };
    setData((prevData) => ({
      ...prevData,
      workspaces: prevData.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              boards: [...workspace.boards, newBoard],
            }
          : workspace,
      ),
    }));
  };
  const addTask = (workspaceId: string, boardId: string, title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
    };

    setData((prevData) => ({
      ...prevData,

      workspaces: prevData.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,

              boards: workspace.boards.map((board) =>
                board.id === boardId
                  ? {
                      ...board,
                      tasks: [...board.tasks, newTask],
                    }
                  : board,
              ),
            }
          : workspace,
      ),
    }));
  };
  return {
    data,
    addWorkspace,
    addBoard,
    addTask,
  };
};
export default useWorkspaceState;
