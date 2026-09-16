import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { memberSchema, type MemberFormData } from "../../schemas/memberSchema";
import type { Workspace } from "../../types/workspace";
import useWorkspaceStore from "../../stores/workspaceStore";
import s from "./WorkspaceMembers.module.css";

interface WorkspaceMembersProps {
  workspace: Workspace;
}

const WorkspaceMembers = ({ workspace }: WorkspaceMembersProps) => {
  const addMember = useWorkspaceStore((state) => state.addMember);

  const removeMember = useWorkspaceStore((state) => state.removeMember);

  const [serverError, setServerError] = useState<string | null>(null);

  const [removingUserId, setRemovingUserId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: MemberFormData) => {
    setServerError(null);

    try {
      await addMember(workspace.id, data.email);

      reset();
    } catch {
      setServerError("Could not add workspace member");
    }
  };

  const handleRemove = async (userId: string) => {
    setServerError(null);
    setRemovingUserId(userId);

    try {
      await removeMember(workspace.id, userId);
    } catch {
      setServerError("Could not remove workspace member");
    } finally {
      setRemovingUserId(null);
    }
  };

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2 className={s.title}>Members</h2>

        <span className={s.count}>{workspace.members.length}</span>
      </div>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.field}>
          <input
            type="email"
            className={s.input}
            placeholder="Member email"
            disabled={isSubmitting}
            {...register("email")}
          />

          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>

        <button type="submit" className={s.addButton} disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add member"}
        </button>
      </form>

      {serverError && <p className={s.error}>{serverError}</p>}

      {workspace.members.length > 0 ? (
        <ul className={s.list}>
          {workspace.members.map((member) => (
            <li key={member.userId} className={s.member}>
              <span className={s.email}>{member.email}</span>

              <button
                type="button"
                className={s.removeButton}
                disabled={removingUserId === member.userId}
                onClick={() => {
                  void handleRemove(member.userId);
                }}
              >
                {removingUserId === member.userId ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.empty}>No members yet.</p>
      )}
    </section>
  );
};

export default WorkspaceMembers;
