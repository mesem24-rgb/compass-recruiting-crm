"use client";

import { useRouter } from "next/navigation";
import { deleteCandidateNote } from "@/lib/candidates";

type DeleteCandidateNoteButtonProps = {
  noteId: string;
};

export default function DeleteCandidateNoteButton({
  noteId,
}: DeleteCandidateNoteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) return;

    await deleteCandidateNote(noteId);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs font-medium text-red-600 hover:text-red-700"
    >
      Delete
    </button>
  );
}