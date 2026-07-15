"use client";

import type { Candidate } from "@/lib/candidates";
import EditCandidateButton from "@/components/candidates/EditCandidateButton";
import DeleteCandidateButton from "@/components/candidates/DeleteCandidateButton";
import ResumeUploadButton from "@/components/candidates/ResumeUploadButton";
import ViewResumeButton from "@/components/candidates/ViewResumeButton";
import { useModals } from "@/components/providers/ModalProvider";

/* SECTION: Candidate Actions Types */

type CandidateActionsProps = {
  candidate: Candidate;
};



/* SECTION: Candidate Actions Component */

export default function CandidateActions({ candidate }: CandidateActionsProps) {
    const { openInterviewModal } = useModals();
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Candidate Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage the candidate profile, recruiting workflow, and resume.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* SECTION: Candidate Management */}

        <ActionGroup
          title="Candidate Management"
          description="Update or remove this candidate record."
        >
          <EditCandidateButton candidate={candidate} />

          <DeleteCandidateButton candidateId={candidate.id} />
        </ActionGroup>

        {/* SECTION: Recruiting Workflow */}

        <ActionGroup
          title="Recruiting Workflow"
          description="Move the candidate through the hiring process."
        >
          <button
            type="button"
            onClick={() => openInterviewModal(candidate.id)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Schedule Interview
          </button>

          <button
            type="button"
            className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Submit to Client
          </button>
        </ActionGroup>

        {/* SECTION: Resume Management */}

        <ActionGroup
          title="Resume Management"
          description="View, replace, or process the candidate resume."
        >
          {candidate.resume_filename ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Resume uploaded
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-900">
                {candidate.resume_filename}
              </p>

              {candidate.resume_uploaded_at && (
                <p className="mt-1 text-xs text-slate-500">
                  Uploaded{" "}
                  {new Date(candidate.resume_uploaded_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-700">
                No resume uploaded
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Upload a PDF, DOC, or DOCX file.
              </p>
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <ViewResumeButton resumePath={candidate.resume_path} />

            <ResumeUploadButton
              candidateId={candidate.id}
              currentFilename={candidate.resume_filename}
            />
          </div>
        </ActionGroup>
      </div>
    </section>
  );
}

/* SECTION: Action Group */

function ActionGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}
