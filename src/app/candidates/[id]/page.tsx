import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import DeleteCandidateButton from "@/components/candidates/DeleteCandidateButton";
import EditCandidateButton from "@/components/candidates/EditCandidateButton";
import AddCandidateNote from "@/components/candidates/AddCandidateNote";
import { getCandidateById, getCandidateNotes } from "@/lib/candidates";
import DeleteCandidateNoteButton from "@/components/candidates/DeleteCandidateNoteButton";
import { getSubmissionsForCandidate } from "@/lib/submissions";
import ActionBar from "@/components/ui/ActionBar";
import ResumeUploadButton from "@/components/candidates/ResumeUploadButton";
import ViewResumeButton from "@/components/candidates/ViewResumeButton";

type CandidateDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const { id } = await params;

  const candidate = await getCandidateById(id);
  const notes = await getCandidateNotes(id);
  const submissions = await getSubmissionsForCandidate(id);

  if (!candidate) {
    notFound();
  }

  return (
    <AppShell>
      {/* SECTION: Back Link */}

      <Link
        href="/candidates"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← Back to Candidates
      </Link>

      {/* SECTION: Candidate Header */}

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            {candidate.name}
          </h1>
          <p className="text-slate-500">{candidate.role ?? "No role listed"}</p>
        </div>

        <StatusBadge status={candidate.status ?? "Qualified"} />
      </div>

      {/* SECTION: Candidate Actions */}

      <ActionBar title="Candidate Actions">
        <EditCandidateButton candidate={candidate} />

        <ResumeUploadButton
          candidateId={candidate.id}
          currentFilename={candidate.resume_filename}
        />

        <ViewResumeButton resumePath={candidate.resume_path} />

        <DeleteCandidateButton candidateId={candidate.id} />
      </ActionBar>

      <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Schedule Interview
      </button>

      <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Submit to Client
      </button>

      <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Add Note
      </button>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          {/* SECTION: Candidate Overview */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Candidate Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info
                label="Email"
                value={candidate.email ?? "No email listed"}
              />
              <Info
                label="Phone"
                value={candidate.phone ?? "No phone listed"}
              />
              <Info
                label="Resume"
                value={candidate.resume_filename ?? "No resume uploaded"}
              />

              <Info
                label="Resume Status"
                value={
                  !candidate.resume_filename
                    ? "No resume uploaded"
                    : candidate.resume_parsed
                      ? "Parsed"
                      : "Awaiting parsing"
                }
              />
              <Info
                label="Location"
                value={candidate.location ?? "No location listed"}
              />
              <Info
                label="Source"
                value={candidate.source ?? "No source listed"}
              />
              <Info
                label="Experience"
                value={candidate.experience ?? "No experience listed"}
              />
              <Info
                label="Target Salary"
                value={candidate.salary ?? "No salary listed"}
              />
              <Info
                label="Recruiter"
                value={candidate.recruiter ?? "Unassigned"}
              />
              <Info
                label="Created"
                value={new Date(candidate.created_at).toLocaleDateString()}
              />
            </div>
          </div>

          {/* SECTION: Hiring Timeline */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-950">
              Hiring Timeline
            </h2>

            <div className="grid gap-4 md:grid-cols-5">
              {["Applied", "Qualified", "Submitted", "Interview", "Placed"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-xl border border-slate-200 p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium text-slate-700">{step}</p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* SECTION: Active Submissions */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-950">
              Active Submissions
            </h2>

            <div className="space-y-3">
              {submissions.length > 0 ? (
                submissions.map((submission) => {
                  const job = submission.job_orders;

                  if (!job) return null;

                  return (
                    <Link
                      href={`/job-orders/${job.id}`}
                      key={submission.id}
                      className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium text-slate-950">
                            {job.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            {job.client ?? "No client listed"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <StatusBadge
                            status={submission.stage ?? "Submitted"}
                          />
                          <StatusBadge status={job.priority ?? "Medium"} />
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  This candidate has not been submitted to any job orders yet.
                </div>
              )}
            </div>
          </div>

          {/* SECTION: Recruiter Notes */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Recruiter Notes
              </h2>
            </div>

            <AddCandidateNote candidateId={candidate.id} />

            <div className="mt-4 space-y-4">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-sm text-slate-700">{note.note}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        {note.author ?? "Recruiter"} •{" "}
                        {new Date(note.created_at).toLocaleDateString()}
                      </p>

                      <DeleteCandidateNoteButton noteId={note.id} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No notes have been added yet.
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* SECTION: Quick Actions */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Quick Actions
            </h2>

            <div className="mt-4 space-y-3">
              <button className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Add Note
              </button>

              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Schedule Interview
              </button>

              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Submit to Client
              </button>

              <ResumeUploadButton
                candidateId={candidate.id}
                currentFilename={candidate.resume_filename}
              />
              <DeleteCandidateButton candidateId={candidate.id} />
            </div>
          </div>

          {/* SECTION: Pipeline Status */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Pipeline Status
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Current Stage: {candidate.status ?? "Qualified"}</p>
              <p>Assigned Recruiter: {candidate.recruiter ?? "Unassigned"}</p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}
