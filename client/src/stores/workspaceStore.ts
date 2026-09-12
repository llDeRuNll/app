import { create } from "zustand";
import { mockData } from "../data/mockData";
import type { WorkspaceData, Workspace, Board, Task } from "../types/workspace";
import { moveItem } from "../utils/moveItem";

interface WorkspaceStore {
  data: WorkspaceData;

  addWorkspace: (name: string) => void;
  editWorkspace: (workspaceId: string, name: string) => void;
  deleteWorkspace: (workspaceId: string) => void;

  addBoard: (workspaceId: string, name: string) => void;
  editBoard: (workspaceId: string, boardId: string, name: string) => void;
  deleteBoard: (workspaceId: string, boardId: string) => void;

  reorderBoards: (
    workspaceId: string,
    fromIndex: number,
    toIndex: number,
  ) => void;

  addTask: (workspaceId: string, boardId: string, title: string) => void;
}
const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  data: mockData,

  addWorkspace: (name) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      boards: [],
    };
    set((state) => ({
      data: {
        ...state.data,
        workspaces: [...state.data.workspaces, newWorkspace],
      },
    }));
  },

  addBoard: (workspaceId, name) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name,
      tasks: [],
    };
    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: [...workspace.boards, newBoard],
              }
            : workspace,
        ),
      },
    }));
  },
  addTask: (workspaceId, boardId, title) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
    };

    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.map((workspace) =>
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
      },
    }));
  },
  editWorkspace: (workspaceId, newName) => {
    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                name: newName,
              }
            : workspace,
        ),
      },
    }));
  },
  deleteWorkspace: (workspaceId) => {
    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.filter(
          (workspace) => workspace.id !== workspaceId,
        ),
      },
    }));
  },

  editBoard: (workspaceId, boardId, newName) => {
    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.map((workspace) =>
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
      },
    }));
  },
  deleteBoard: (workspaceId, boardId) => {
    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: workspace.boards.filter(
                  (board) => board.id !== boardId,
                ),
              }
            : workspace,
        ),
      },
    }));
  },
  reorderBoards: (workspaceId, fromIndex, toIndex) => {
    set((state) => ({
      data: {
        ...state.data,
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: moveItem(workspace.boards, fromIndex, toIndex),
              }
            : workspace,
        ),
      },
    }));
  },
}));
export default useWorkspaceStore;
