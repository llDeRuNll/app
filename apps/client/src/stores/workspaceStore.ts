import { create } from "zustand";
import type { Workspace, WorkspaceSummary } from "../types/workspace";
import { workspaceService } from "../services/workspaceService";
import { boardService } from "../services/boardService";
import { taskService } from "../services/taskService";

interface WorkspaceStoreData {
  workspaces: Workspace[];
}

interface WorkspaceStore {
  data: WorkspaceStoreData;
  isLoading: boolean;
  error: string | null;
  loadWorkspaces: () => Promise<void>;
  loadWorkspace: (workspaceId: string) => Promise<void>;
  addWorkspace: (name: string) => Promise<void>;
  editWorkspace: (workspaceId: string, name: string) => Promise<void>;
  deleteWorkspace: (workspaceId: string) => Promise<void>;
  addBoard: (workspaceId: string, name: string) => Promise<void>;
  editTask: (
    workspaceId: string,
    boardId: string,
    taskId: string,
    title: string,
  ) => Promise<void>;

  deleteTask: (
    workspaceId: string,
    boardId: string,
    taskId: string,
  ) => Promise<void>;

  editBoard: (
    workspaceId: string,
    boardId: string,
    name: string,
  ) => Promise<void>;
  deleteBoard: (workspaceId: string, boardId: string) => Promise<void>;
  reorderBoards: (
    workspaceId: string,
    fromIndex: number,
    toIndex: number,
  ) => Promise<void>;
  addTask: (
    workspaceId: string,
    boardId: string,
    title: string,
  ) => Promise<void>;
  addMember: (workspaceId: string, email: string) => Promise<void>;
  removeMember: (workspaceId: string, userId: string) => Promise<void>;
}

function summaryToWorkspace(workspace: WorkspaceSummary): Workspace {
  return {
    ...workspace,
    boards: [],
    members: [],
  };
}

const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  data: {
    workspaces: [],
  },

  isLoading: false,
  error: null,

  loadWorkspaces: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const workspaces = await workspaceService.getAll();

      set({
        data: {
          workspaces: workspaces.map(summaryToWorkspace),
        },
      });
    } catch {
      set({
        error: "Could not load workspaces",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  loadWorkspace: async (workspaceId) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const workspace = await workspaceService.getById(workspaceId);

      set((state) => ({
        data: {
          workspaces: state.data.workspaces.map((currentWorkspace) =>
            currentWorkspace.id === workspaceId ? workspace : currentWorkspace,
          ),
        },
      }));
    } catch {
      set({
        error: "Could not load workspace",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  addWorkspace: async (name) => {
    const workspace = await workspaceService.create(name);

    set((state) => ({
      data: {
        workspaces: [...state.data.workspaces, summaryToWorkspace(workspace)],
      },
    }));
  },

  editWorkspace: async (workspaceId, name) => {
    const updatedWorkspace = await workspaceService.update(workspaceId, name);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                ...updatedWorkspace,
              }
            : workspace,
        ),
      },
    }));
  },

  deleteWorkspace: async (workspaceId) => {
    await workspaceService.remove(workspaceId);
    set((state) => ({
      data: {
        workspaces: state.data.workspaces.filter(
          (workspace) => workspace.id !== workspaceId,
        ),
      },
    }));
  },

  addBoard: async (workspaceId, name) => {
    const board = await boardService.create(workspaceId, name);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: [
                  ...workspace.boards,
                  {
                    ...board,
                    tasks: [],
                  },
                ],
              }
            : workspace,
        ),
      },
    }));
  },

  editBoard: async (workspaceId, boardId, name) => {
    const updateBoard = await boardService.update(workspaceId, boardId, name);
    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: workspace.boards.map((board) =>
                  board.id === boardId
                    ? {
                        ...board,
                        ...updateBoard,
                      }
                    : board,
                ),
              }
            : workspace,
        ),
      },
    }));
  },

  deleteBoard: async (workspaceId, boardId) => {
    await boardService.remove(workspaceId, boardId);
    set((state) => ({
      data: {
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

  reorderBoards: async (workspaceId, fromIndex, toIndex) => {
    const workspace = get().data.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );

    if (!workspace) {
      return;
    }

    const reorderedBoards = [...workspace.boards];

    const [movedBoard] = reorderedBoards.splice(fromIndex, 1);

    if (!movedBoard) {
      return;
    }

    reorderedBoards.splice(toIndex, 0, movedBoard);

    const boardIds = reorderedBoards.map((board) => board.id);

    await boardService.reorder(workspaceId, boardIds);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((currentWorkspace) =>
          currentWorkspace.id === workspaceId
            ? {
                ...currentWorkspace,
                boards: reorderedBoards.map((board, position) => ({
                  ...board,
                  position,
                })),
              }
            : currentWorkspace,
        ),
      },
    }));
  },

  addTask: async (workspaceId, boardId, title) => {
    const task = await taskService.create(workspaceId, boardId, title);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: workspace.boards.map((board) =>
                  board.id === boardId
                    ? {
                        ...board,
                        tasks: [...board.tasks, task],
                      }
                    : board,
                ),
              }
            : workspace,
        ),
      },
    }));
  },
  editTask: async (workspaceId, boardId, taskId, title) => {
    const updatedTask = await taskService.update(
      workspaceId,
      boardId,
      taskId,
      title,
    );

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: workspace.boards.map((board) =>
                  board.id === boardId
                    ? {
                        ...board,
                        tasks: board.tasks.map((task) =>
                          task.id === taskId ? updatedTask : task,
                        ),
                      }
                    : board,
                ),
              }
            : workspace,
        ),
      },
    }));
  },

  deleteTask: async (workspaceId, boardId, taskId) => {
    await taskService.remove(workspaceId, boardId, taskId);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((workspace) =>
          workspace.id === workspaceId
            ? {
                ...workspace,
                boards: workspace.boards.map((board) =>
                  board.id === boardId
                    ? {
                        ...board,
                        tasks: board.tasks.filter((task) => task.id !== taskId),
                      }
                    : board,
                ),
              }
            : workspace,
        ),
      },
    }));
  },

  addMember: async (workspaceId, email) => {
    await workspaceService.addMember(workspaceId, email);

    const workspace = await workspaceService.getById(workspaceId);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((currentWorkspace) =>
          currentWorkspace.id === workspaceId ? workspace : currentWorkspace,
        ),
      },
    }));
  },

  removeMember: async (workspaceId, userId) => {
    await workspaceService.removeMember(workspaceId, userId);

    const workspace = await workspaceService.getById(workspaceId);

    set((state) => ({
      data: {
        workspaces: state.data.workspaces.map((currentWorkspace) =>
          currentWorkspace.id === workspaceId ? workspace : currentWorkspace,
        ),
      },
    }));
  },
}));

export default useWorkspaceStore;
