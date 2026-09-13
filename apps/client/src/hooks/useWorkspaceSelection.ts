import { useState } from "react";
import type { Workspace } from "../types/workspace";

const useWorkspaceSelection = (workspaces: Workspace[]) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    workspaces[0]?.id ?? null,
  );

  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedId) ??
    workspaces[0];

  const selectedWorkspaceId = selectedWorkspace?.id ?? null;

  const selectWorkspace = (id: string) => {
    setSelectedId(id);
  };

  return {
    selectedWorkspaceId,
    selectedWorkspace,
    selectWorkspace,
  };
};
export default useWorkspaceSelection;
