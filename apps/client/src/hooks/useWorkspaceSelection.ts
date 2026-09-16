import { useCallback, useState } from "react";
import type { Workspace } from "../types/workspace";

const useWorkspaceSelection = (workspaces: Workspace[]) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedId) ??
    workspaces[0] ??
    null;

  const selectedWorkspaceId = selectedWorkspace?.id ?? null;

  const selectWorkspace = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return {
    selectedWorkspaceId,
    selectedWorkspace,
    selectWorkspace,
  };
};
export default useWorkspaceSelection;
