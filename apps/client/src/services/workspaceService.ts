import type { Workspace, WorkspaceSummary } from "../types/workspace";

import { httpClient } from "./httpClient";

interface WorkspaceNamePayload {
  name: string;
}

interface AddMemberPayload {
  email: string;
}

async function getAll() {
  const { data } = await httpClient.get<WorkspaceSummary[]>("/workspaces");

  return data;
}

async function getById(workspaceId: string) {
  const { data } = await httpClient.get<Workspace>(
    `/workspaces/${workspaceId}`,
  );

  return data;
}

async function create(name: string) {
  const { data } = await httpClient.post<WorkspaceSummary>("/workspaces", {
    name,
  } satisfies WorkspaceNamePayload);

  return data;
}

async function update(workspaceId: string, name: string) {
  const { data } = await httpClient.patch<WorkspaceSummary>(
    `/workspaces/${workspaceId}`,
    {
      name,
    } satisfies WorkspaceNamePayload,
  );

  return data;
}

async function remove(workspaceId: string) {
  await httpClient.delete(`/workspaces/${workspaceId}`);
}

async function addMember(workspaceId: string, email: string) {
  await httpClient.post(`/workspaces/${workspaceId}/members`, {
    email,
  } satisfies AddMemberPayload);
}

async function removeMember(workspaceId: string, userId: string) {
  await httpClient.delete(`/workspaces/${workspaceId}/members/${userId}`);
}

export const workspaceService = {
  getAll,
  getById,
  create,
  update,
  remove,
  addMember,
  removeMember,
};
