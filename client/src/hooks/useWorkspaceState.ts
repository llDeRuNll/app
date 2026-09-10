import { useState } from "react";
import { mockData } from "../data/mockData";
import type { WorkspaceData, Workspace, Board, Task } from "../types/workspace";
import { moveItem } from "../utils/moveItem";

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
  const editWorkspace = (workspaceId: string, newName: string) => {
    setData((prevData) => ({
      ...prevData,
      workspaces: prevData.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              name: newName,
            }
          : workspace,
      ),
    }));
  };
  const deleteWorkspace = (workspaceId: string) => {
    setData((prevData) => ({
      ...prevData,
      workspaces: prevData.workspaces.filter(
        (workspace) => workspace.id !== workspaceId,
      ),
    }));
  };

  const editBoard = (workspaceId: string, boardId: string, newName: string) => {
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
                      name: newName,
                    }
                  : board,
              ),
            }
          : workspace,
      ),
    }));
  };
  const deleteBoard = (workspaceId: string, boardId: string) => {
    setData((prevData) => ({
      ...prevData,
      workspaces: prevData.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              boards: workspace.boards.filter((board) => board.id !== boardId),
            }
          : workspace,
      ),
    }));
  };
  const reorderBoards = (
    workspaceId: string,
    fromIndex: number,
    toIndex: number,
  ) => {
    setData((prevData) => ({
      ...prevData,
      workspaces: prevData.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              boards: moveItem(workspace.boards, fromIndex, toIndex),
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
    editWorkspace,
    deleteWorkspace,
    editBoard,
    deleteBoard,
    reorderBoards,
  };
};
export default useWorkspaceState;
