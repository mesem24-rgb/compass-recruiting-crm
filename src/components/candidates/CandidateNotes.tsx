import AddCandidateNote from "@/components/candidates/AddCandidateNote";
import DeleteCandidateNoteButton from "@/components/candidates/DeleteCandidateNoteButton";
import EmptyState from "@/components/ui/EmptyState";
import PageSection from "@/components/ui/PageSection";
import type { CandidateNote } from "@/lib/candidates";

type CandidateNotesProps = {
  candidateId: string;
  notes: CandidateNote[];
};

export default function CandidateNotes({
  candidateId,
  notes,
}: CandidateNotesProps) {
  return (
    <PageSection
      title="Recruiter Notes"
      description="Internal notes and follow-up details for this candidate."
    >
      <AddCandidateNote candidateId={candidateId} />

      <div className="mt-4 space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
            >
              <p className="whitespace-pre-wrap text-sm text-slate-700">
                {note.note}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  {note.author ?? "Recruiter"} ·{" "}
                  {new Date(note.created_at).toLocaleDateString()}
                </p>

                <DeleteCandidateNoteButton noteId={note.id} />
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="No recruiter notes."
            description="Add a note to record candidate conversations, follow-ups, or internal feedback."
          />
        )}
      </div>
    </PageSection>
  );
}