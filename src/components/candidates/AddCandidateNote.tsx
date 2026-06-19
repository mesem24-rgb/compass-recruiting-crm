"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCandidateNote } from "@/lib/candidates";

type AddCandidateNoteProps = {
  candidateId: string;
};

export default function AddCandidateNote({
  candidateId,
}: AddCandidateNoteProps) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSaveNote() {
    if (!note.trim()) return;

    setIsSaving(true);

    await addCandidateNote(candidateId, note);

    setNote("");
    setIsSaving(false);
    router.refresh();
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      {/* SECTION: Add Note Field */}

      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        rows={3}
        placeholder="Add a recruiter note..."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
      />

      {/* SECTION: Add Note Actions */}

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSaveNote}
          disabled={isSaving || !note.trim()}
          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Note"}
        </button>
      </div>
    </div>
  );
}