import type { Task } from "../types/workspace";
import { httpClient } from "./httpClient";

interface TaskPayload {
  title: string;
}

async function getAll(workspaceId: string, boardId: string) {
  const { data } = await httpClient.get<Task[]>(
    `/workspaces/${workspaceId}/boards/${boardId}/tasks`,
  );

  return data;
}

async function create(workspaceId: string, boardId: string, title: string) {
  const { data } = await httpClient.post<Task>(
    `/workspaces/${workspaceId}/boards/${boardId}/tasks`,
    {
      title,
    } satisfies TaskPayload,
  );

  return data;
}

async function update(
  workspaceId: string,
  boardId: string,
  taskId: string,
  title: string,
) {
  const { data } = await httpClient.patch<Task>(
    `/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}`,
    {
      title,
    } satisfies TaskPayload,
  );

  return data;
}

async function remove(workspaceId: string, boardId: string, taskId: string) {
  await httpClient.delete(
    `/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}`,
  );
}

export const taskService = {
  getAll,
  create,
  update,
  remove,
};
