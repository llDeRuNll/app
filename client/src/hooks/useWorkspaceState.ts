import { useState } from "react";
import { mockData } from "../data/mockData";
import type { WorkspaceData, Workspace } from "../types/workspace";

const useWorkspaceState = () => {
  const [data, setData] = useState<WorkspaceData>(mockData);

  const addWorkspace = (name: string) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      boards: [],
    };
    setData((prevData) => ({
      ...prevData,
      workspaces: [...prevData.workspaces, newWorkspace],
    }));
  };
  return {
    data,
    addWorkspace,
  };
};
export default useWorkspaceState;
