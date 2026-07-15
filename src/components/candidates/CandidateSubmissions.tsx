import Link from "next/link";
import PageSection from "@/components/ui/PageSection";
import EmptyState from "@/components/ui/EmptyState";
import type { CandidateSubmissionWithJobOrder } from "@/lib/submissions";

type Props = {
  submissions: CandidateSubmissionWithJobOrder[];
};

export default function CandidateSubmissions({ submissions }: Props) {
  return (
    <PageSection
      title={`Active Submissions (${submissions.length})`}
      description="Job orders this candidate has been submitted to."
    >
      <div className="space-y-3">
        {submissions.length > 0 ? (
          submissions.map((submission) => {
            const job = submission.job_orders;

            if (!job) return null;

            return (
              <Link
                key={submission.id}
                href={`/job-orders/${job.id}`}
                className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
              >
                <div>
                  <p className="font-medium text-slate-950">{job.title}</p>

                  <p className="text-sm text-slate-500">
                    {job.client ?? "No client listed"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Status: {job.status ?? "Unknown"}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <EmptyState
            title="No active submissions."
            description="This candidate has not been submitted to any job orders."
          />
        )}
      </div>
    </PageSection>
  );
}
