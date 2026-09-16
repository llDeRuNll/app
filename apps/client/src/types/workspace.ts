export interface Task {
  id: string;
  title: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
}
export interface Board {
  id: string;
  name: string;
  position: number;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface WorkspaceMember {
  userId: string;
  email: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  boards: Board[];
  members: WorkspaceMember[];
}

export interface WorkspaceSummary {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
