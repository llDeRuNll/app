import type { Board } from "../types/workspace";
import { httpClient } from "./httpClient";

interface BoardPayload {
  name: string;
}

interface ReorderBoardsPayload {
  boardIds: string[];
}

async function getAll(workspaceId: string) {
  const { data } = await httpClient.get<Board[]>(
    `/workspaces/${workspaceId}/boards`,
  );

  return data;
}

async function create(workspaceId: string, name: string) {
  const { data } = await httpClient.post<Board>(
    `/workspaces/${workspaceId}/boards`,
    {
      name,
    } satisfies BoardPayload,
  );

  return data;
}

async function update(workspaceId: string, boardId: string, name: string) {
  const { data } = await httpClient.patch<Board>(
    `/workspaces/${workspaceId}/boards/${boardId}`,
    {
      name,
    } satisfies BoardPayload,
  );

  return data;
}

async function remove(workspaceId: string, boardId: string) {
  await httpClient.delete(`/workspaces/${workspaceId}/boards/${boardId}`);
}

async function reorder(workspaceId: string, boardIds: string[]) {
  const { data } = await httpClient.patch<Board[]>(
    `/workspaces/${workspaceId}/boards/reorder`,
    {
      boardIds,
    } satisfies ReorderBoardsPayload,
  );

  return data;
}

export const boardService = {
  getAll,
  create,
  update,
  remove,
  reorder,
};
