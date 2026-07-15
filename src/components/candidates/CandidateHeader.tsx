import StatusBadge from "@/components/ui/StatusBadge";
import type { Candidate } from "@/lib/candidates";

type CandidateHeaderProps = {
  candidate: Candidate;
};

export default function CandidateHeader({
  candidate,
}: CandidateHeaderProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">
          {candidate.name}
        </h1>

        <p className="mt-1 text-slate-500">
          {candidate.role ?? "No role listed"}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          <span>{candidate.location ?? "No location listed"}</span>

          <span>{candidate.recruiter ?? "Unassigned recruiter"}</span>

          {candidate.resume_filename && (
            <span>Resume uploaded</span>
          )}
        </div>
      </div>

      <StatusBadge status={candidate.status ?? "Qualified"} />
    </div>
  );
}