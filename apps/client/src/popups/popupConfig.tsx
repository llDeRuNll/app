import type { ReactNode } from "react";

import {
  CreateWorkspacePopup,
  EditWorkspacePopup,
  DeleteWorkspacePopup,
  CreateBoardPopup,
  EditBoardPopup,
  DeleteBoardPopup,
} from "./WorkspacePopups";

export const PopupType = {
  CREATE_WORKSPACE: "create-workspace",
  EDIT_WORKSPACE: "edit-workspace",
  DELETE_WORKSPACE: "delete-workspace",
  CREATE_BOARD: "create-board",
  EDIT_BOARD: "edit-board",
  DELETE_BOARD: "delete-board",
} as const;

export type PopupType = (typeof PopupType)[keyof typeof PopupType];

export interface PopupMetadata {
  workspaceId?: string;
  boardId?: string;
}

export const popupTypeComponentMap: Record<PopupType, ReactNode> = {
  [PopupType.CREATE_WORKSPACE]: <CreateWorkspacePopup />,
  [PopupType.EDIT_WORKSPACE]: <EditWorkspacePopup />,
  [PopupType.DELETE_WORKSPACE]: <DeleteWorkspacePopup />,

  [PopupType.CREATE_BOARD]: <CreateBoardPopup />,
  [PopupType.EDIT_BOARD]: <EditBoardPopup />,
  [PopupType.DELETE_BOARD]: <DeleteBoardPopup />,
};
