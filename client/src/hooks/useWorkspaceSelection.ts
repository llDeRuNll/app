import { useState } from "react";
import type { Workspace } from "../types/workspace";

const useWorkspaceSelection = (workspaces: Workspace[]) => {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(
    workspaces[0].id,
  );

  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === selectedWorkspaceId,
  );
  const selectWorkspace = (id: string) => {
    setSelectedWorkspaceId(id);
  };

  return {
    selectedWorkspaceId,
    selectedWorkspace,
    selectWorkspace,
  };
};
export default useWorkspaceSelection;
