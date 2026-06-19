"use client";

import { useRouter } from "next/navigation";
import { deleteCandidate } from "@/lib/candidates";

type DeleteCandidateButtonProps = {
  candidateId: string;
};

export default function DeleteCandidateButton({
  candidateId,
}: DeleteCandidateButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?",
    );

    if (!confirmed) return;

    await deleteCandidate(candidateId);

    router.push("/candidates");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      Delete Candidate
    </button>
  );
}