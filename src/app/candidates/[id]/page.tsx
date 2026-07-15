import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getCandidateById, getCandidateNotes } from "@/lib/candidates";
import { getSubmissionsForCandidate } from "@/lib/submissions";
import CandidateActions from "@/components/candidates/CandidateActions";
import CandidateOverview from "@/components/candidates/CandidateOverview";
import CandidateTimeline from "@/components/candidates/CandidateTimeline";
import CandidateNotes from "@/components/candidates/CandidateNotes";
import CandidateSubmissions from "@/components/candidates/CandidateSubmissions";
import CandidateHeader from "@/components/candidates/CandidateHeader";
import CandidateSidebar from "@/components/candidates/CandidateSidebar";
import { getInterviewsForCandidate } from "@/lib/interviews";
import UpcomingInterviewCard from "@/components/candidates/UpcomingInterviewCard";

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

  if (!candidate) {
    notFound();
  }

  const [notes, submissions, interviews] = await Promise.all([
    getCandidateNotes(id),
    getSubmissionsForCandidate(id),
    getInterviewsForCandidate(id),
  ]);

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

      <CandidateHeader candidate={candidate} />

      {/* SECTION: Candidate Actions */}

      <CandidateActions candidate={candidate} />

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          {/* SECTION: Candidate Overview */}

          <CandidateOverview candidate={candidate} />

          {/* SECTION: Hiring Timeline */}

          <CandidateTimeline
            currentStatus={candidate.status}
            interviews={interviews}
          />

          <CandidateTimeline
            currentStatus={candidate.status}
            interviews={interviews}
          />

          {/* SECTION: Upcoming Interview */}

          <UpcomingInterviewCard interviews={interviews} />

          {/* SECTION: Active Submissions */}

          <CandidateSubmissions submissions={submissions} />

          {/* SECTION: Recruiter Notes */}

          <CandidateNotes candidateId={candidate.id} notes={notes} />
        </section>

        <CandidateSidebar candidate={candidate} />
      </div>
    </AppShell>
  );
}
