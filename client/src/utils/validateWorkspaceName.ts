export const validateWorkspaceName = (name: string): string | null => {
  if (/[^a-z]/.test(name)) {
    return "Workspace name can only have lowercase leters";
  }
  if (name.length < 5) {
    return "Workspace name must be at least 5 characters";
  }
  if (name.length > 30) {
    return "Workspace name must be no more than 30 characters";
  }
  return null;
};
