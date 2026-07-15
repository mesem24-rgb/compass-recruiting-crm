import PageSection from "@/components/ui/PageSection";
import ResumeStatusBadge from "@/components/candidates/ResumeStatusBadge";
import type { Candidate } from "@/lib/candidates";

type CandidateOverviewProps = {
  candidate: Candidate;
};

export default function CandidateOverview({
  candidate,
}: CandidateOverviewProps) {
  return (
    <PageSection
      title="Candidate Overview"
      description="Contact details, recruiting information, and resume status."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Info label="Email" value={candidate.email ?? "No email listed"} />
        <Info label="Phone" value={candidate.phone ?? "No phone listed"} />

        <Info
          label="Location"
          value={
            [candidate.location, candidate.zip_code]
              .filter(Boolean)
              .join(" · ") || "No location listed"
          }
        />

        <Info label="Source" value={candidate.source ?? "No source listed"} />

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

        <Info
          label="Resume"
          value={candidate.resume_filename ?? "No resume uploaded"}
        />

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Resume Status
          </p>

          <div className="mt-2">
            <ResumeStatusBadge
              status={
                candidate.resume_filename
                  ? candidate.resume_processing_status
                  : null
              }
            />
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words font-medium text-slate-900">{value}</p>
    </div>
  );
}