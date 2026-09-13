import { useCallback } from "react";
import usePopupStore from "../stores/popupStore";
import useWorkspaceStore from "../stores/workspaceStore";
import { PopupType } from "../popups/popupConfig";

const useWorkspaceActions = (selectedWorkspaceId: string | null) => {
  const openPopup = usePopupStore((state) => state.openPopup);

  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);

  const deleteBoard = useWorkspaceStore((state) => state.deleteBoard);

  const reorderBoards = useWorkspaceStore((state) => state.reorderBoards);

  const addTask = useWorkspaceStore((state) => state.addTask);

  const handleCreateWorkspace = useCallback(() => {
    openPopup({
      type: PopupType.CREATE_WORKSPACE,
    });
  }, [openPopup]);

  const handleEditWorkspace = useCallback(() => {
    if (!selectedWorkspaceId) return;

    openPopup({
      type: PopupType.EDIT_WORKSPACE,
      metadata: {
        workspaceId: selectedWorkspaceId,
      },
    });
  }, [selectedWorkspaceId, openPopup]);

  const handleDeleteWorkspace = useCallback(() => {
    if (!selectedWorkspaceId) return;

    const workspaceId = selectedWorkspaceId;

    openPopup({
      type: PopupType.DELETE_WORKSPACE,

      metadata: {
        workspaceId,
      },

      onAcceptCallback: () => {
        deleteWorkspace(workspaceId);
      },
    });
  }, [selectedWorkspaceId, openPopup, deleteWorkspace]);

  const handleCreateBoard = useCallback(() => {
    if (!selectedWorkspaceId) return;

    openPopup({
      type: PopupType.CREATE_BOARD,

      metadata: {
        workspaceId: selectedWorkspaceId,
      },
    });
  }, [selectedWorkspaceId, openPopup]);

  const handleEditBoard = useCallback(
    (boardId: string) => {
      if (!selectedWorkspaceId) return;

      openPopup({
        type: PopupType.EDIT_BOARD,

        metadata: {
          workspaceId: selectedWorkspaceId,
          boardId,
        },
      });
    },
    [selectedWorkspaceId, openPopup],
  );

  const handleDeleteBoard = useCallback(
    (boardId: string) => {
      if (!selectedWorkspaceId) return;

      const workspaceId = selectedWorkspaceId;

      openPopup({
        type: PopupType.DELETE_BOARD,

        metadata: {
          workspaceId,
          boardId,
        },

        onAcceptCallback: () => {
          deleteBoard(workspaceId, boardId);
        },
      });
    },
    [selectedWorkspaceId, openPopup, deleteBoard],
  );

  const handleReorderBoard = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (!selectedWorkspaceId) return;

      reorderBoards(selectedWorkspaceId, fromIndex, toIndex);
    },
    [selectedWorkspaceId, reorderBoards],
  );

  const handleAddTask = useCallback(
    (boardId: string) => {
      if (!selectedWorkspaceId) return;

      addTask(selectedWorkspaceId, boardId, "New task");
    },
    [selectedWorkspaceId, addTask],
  );

  return {
    handleCreateWorkspace,
    handleEditWorkspace,
    handleDeleteWorkspace,
    handleCreateBoard,
    handleEditBoard,
    handleDeleteBoard,
    handleReorderBoard,
    handleAddTask,
  };
};

export default useWorkspaceActions;
