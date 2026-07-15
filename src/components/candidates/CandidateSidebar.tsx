import PageSection from "@/components/ui/PageSection";
import type { Candidate } from "@/lib/candidates";

type CandidateSidebarProps = {
  candidate: Candidate;
};

export default function CandidateSidebar({
  candidate,
}: CandidateSidebarProps) {
  return (
    <aside className="space-y-6">
      <PageSection
        title="Pipeline Status"
        description="Current recruiting assignment."
      >
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium">Current Stage:</span>{" "}
            {candidate.status ?? "Qualified"}
          </p>

          <p>
            <span className="font-medium">Assigned Recruiter:</span>{" "}
            {candidate.recruiter ?? "Unassigned"}
          </p>
        </div>
      </PageSection>
    </aside>
  );
}