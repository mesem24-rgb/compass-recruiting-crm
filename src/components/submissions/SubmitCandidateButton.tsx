"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCandidateSubmission } from "@/lib/submissions";

type SubmitCandidateButtonProps = {
  candidateId: string;
  jobOrderId: string;
  alreadySubmitted?: boolean;
};

export default function SubmitCandidateButton({
  candidateId,
  jobOrderId,
  alreadySubmitted = false,
}: SubmitCandidateButtonProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit() {
    try {
      setIsSaving(true);

      await createCandidateSubmission({
        candidateId,
        jobOrderId,
        stage: "Submitted",
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to submit candidate:", error);
      alert(
        error instanceof Error ? error.message : "Failed to submit candidate",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (alreadySubmitted) {
    return (
      <button
        disabled
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
      >
        ✓ Submitted
      </button>
    );
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isSaving}
      className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50"
    >
      {isSaving ? "Submitting..." : "Submit Candidate"}
    </button>
  );
}