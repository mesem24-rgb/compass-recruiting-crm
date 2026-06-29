"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Candidate } from "@/lib/candidates";
import { createCandidateSubmission } from "@/lib/submissions";

type SubmitCandidateModalProps = {
  open: boolean;
  onClose: () => void;
  jobOrderId: string;
  candidates: Candidate[];
};

export default function SubmitCandidateModal({
  open,
  onClose,
  jobOrderId,
  candidates,
}: SubmitCandidateModalProps) {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  async function handleSubmitCandidate() {
    if (!candidateId) return;

    setIsSaving(true);

    await createCandidateSubmission({
      candidateId,
      jobOrderId,
      stage: "Submitted",
      notes,
    });

    setCandidateId("");
    setNotes("");
    setIsSaving(false);
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* SECTION: Modal Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Submit Candidate
            </h2>
            <p className="text-sm text-slate-500">
              Attach a candidate to this job order.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
          >
            Close
          </button>
        </div>

        {/* SECTION: Submit Candidate Form */}

        <div className="space-y-4 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Candidate
            </label>

            <select
              value={candidateId}
              onChange={(event) => setCandidateId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="">Select candidate</option>

              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} — {candidate.role ?? "No role listed"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Submission Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add context for this submission..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
            />
          </div>
        </div>

        {/* SECTION: Modal Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmitCandidate}
            disabled={isSaving || !candidateId}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSaving ? "Submitting..." : "Submit Candidate"}
          </button>
        </div>
      </div>
    </div>
  );
}