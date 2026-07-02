import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import JobOrderActions from "@/components/job-orders/JobOrderActions";
import { getCandidates } from "@/lib/candidates";
import { getJobOrderById } from "@/lib/job-orders";
import { getSubmissionsForJobOrder } from "@/lib/submissions";
import { getRankedCandidateMatches } from "@/lib/matching";
import SubmitCandidateButton from "@/components/submissions/SubmitCandidateButton";
import PageSection from "@/components/ui/PageSection";

type JobOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobOrderDetailPage({
  params,
}: JobOrderDetailPageProps) {
  const { id } = await params;

  const job = await getJobOrderById(id);

  if (!job) {
    notFound();
  }

  const [liveCandidates, submissions] = await Promise.all([
    getCandidates(),
    getSubmissionsForJobOrder(id),
  ]);

  const matches = getRankedCandidateMatches(liveCandidates, job).slice(0, 5);
  const submittedCandidateIds = new Set(
    submissions.map((submission) => submission.candidate_id),
  );
  return (
    <AppShell>
      {/* SECTION: Back Link */}

      <Link
        href="/job-orders"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← Back to Job Orders
      </Link>

      {/* SECTION: Job Header */}

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">{job.title}</h1>
          <p className="text-slate-500">{job.client ?? "No client listed"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusBadge status={job.status ?? "Open"} />
          <StatusBadge status={job.priority ?? "Medium"} />
        </div>
      </div>

      {/* SECTION: Job Actions */}

      <JobOrderActions jobOrder={job} candidates={liveCandidates} />

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          {/* SECTION: Job Overview */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Job Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Client" value={job.client ?? "No client listed"} />
              <Info label="Status" value={job.status ?? "Open"} />
              <Info label="Priority" value={job.priority ?? "Medium"} />
              <Info
                label="Location"
                value={job.location ?? "No location listed"}
              />
              <Info
                label="Salary Range"
                value={job.salary_range ?? "No salary listed"}
              />
              <Info
                label="Assigned Recruiter"
                value={job.assigned_recruiter ?? "Unassigned"}
              />
              <Info
                label="Candidates Submitted"
                value={String(submissions.length)}
              />
              <Info
                label="Created"
                value={new Date(job.created_at).toLocaleDateString()}
              />
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Description
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {job.description ?? "No description listed"}
              </p>
            </div>
          </div>

          {/* SECTION: Matching Candidates */}

          <PageSection
            title="Matching Candidates"
            description="Ranked by skills, keywords, location, and relocation fit."
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-950">
                Matching Candidates
              </h2>
              <p className="text-sm text-slate-500">
                Ranked by skills, keywords, location, and relocation fit.
              </p>
            </div>

            <div className="space-y-3">
              {matches.length > 0 ? (
                matches.map((match) => (
                  <div
                    key={match.candidate.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium text-slate-950">
                          {match.candidate.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {match.candidate.role ?? "No role listed"}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-sm text-amber-500">
                          <MatchStars score={match.score} />
                        </p>
                        <div className="mt-1 inline-flex rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
                          {match.score}% Match
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {match.matchedPrioritySkills.map((skill) => (
                        <span
                          key={`priority-${skill}`}
                          className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                        >
                          Priority: {skill}
                        </span>
                      ))}

                      {match.matchedSecondarySkills.map((skill) => (
                        <span
                          key={`secondary-${skill}`}
                          className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                        >
                          Secondary: {skill}
                        </span>
                      ))}

                      {match.matchedKeywords.map((keyword) => (
                        <span
                          key={`keyword-${keyword}`}
                          className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700"
                        >
                          Keyword: {keyword}
                        </span>
                      ))}

                      {match.locationMatch && (
                        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                          Location Match
                        </span>
                      )}

                      {match.relocationMatch && (
                        <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                          Willing to Relocate
                        </span>
                      )}
                    </div>

                    {match.breakdown && (
                      <MatchBreakdown breakdown={match.breakdown} />
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/candidates/${match.candidate.id}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        View Profile
                      </Link>

                      <SubmitCandidateButton
                        candidateId={match.candidate.id}
                        jobOrderId={job.id}
                        alreadySubmitted={submittedCandidateIds.has(
                          match.candidate.id,
                        )}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No matching candidates found yet. Add priority skills or
                  keywords to this job order and candidate profiles to generate
                  matches.
                </div>
              )}
            </div>
          </PageSection>

          {/* SECTION: Submitted Candidates */}

          <PageSection
            title="Submitted Candidates"
            description="Ranked by skills, keywords, location, and relocation fit."
          >
            <h2 className="mb-4 text-lg font-semibold text-slate-950">
              Submitted Candidates
            </h2>

            <div className="space-y-3">
              {submissions.length > 0 ? (
                submissions.map((submission) => {
                  const candidate = submission.candidates;

                  if (!candidate) return null;

                  return (
                    <Link
                      href={`/candidates/${candidate.id}`}
                      key={submission.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                    >
                      <div>
                        <p className="font-medium text-slate-950">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {candidate.role ?? "No role listed"}
                        </p>
                      </div>

                      <StatusBadge status={submission.stage ?? "Submitted"} />
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No candidates have been submitted to this job yet.
                </div>
              )}
            </div>
          </PageSection>

          {/* SECTION: Job Activity */}

          <PageSection
            title="Job Activity"
            description="Recent updates and changes to this job order."
          >
            <h2 className="mb-4 text-lg font-semibold text-slate-950">
              Job Activity
            </h2>

            <div className="space-y-4">
              <Activity
                title="Job order created"
                description="This job order was added to the recruiting pipeline."
                time={new Date(job.created_at).toLocaleDateString()}
              />

              <Activity
                title="Candidate submissions"
                description={`${submissions.length} candidate(s) currently submitted.`}
                time="Live data"
              />
            </div>
          </PageSection>
        </section>

        <aside className="space-y-6">
          {/* SECTION: Job Status */}

          <PageSection
            title="Job Status"
            description="Ranked by skills, keywords, location, and relocation fit."
          >
            <h2 className="text-lg font-semibold text-slate-950">Job Status</h2>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Status: {job.status ?? "Open"}</p>
              <p>Priority: {job.priority ?? "Medium"}</p>
              <p>Recruiter: {job.assigned_recruiter ?? "Unassigned"}</p>
            </div>
          </PageSection>

          {/* SECTION: Quick Metrics */}

          <PageSection
            title="Quick Metrics"
            description="Ranked by skills, keywords, location, and relocation fit."
          >
            <h2 className="text-lg font-semibold text-slate-950">
              Quick Metrics
            </h2>

            <div className="mt-4 grid gap-3">
              <Metric label="Submitted" value={String(submissions.length)} />
              <Metric label="Interviewing" value="0" />
              <Metric label="Offers" value="0" />
            </div>
          </PageSection>
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function Activity({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <p className="font-medium text-slate-950">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <p className="mt-2 text-xs text-slate-400">{time}</p>
    </div>
  );
}

function MatchStars({ score }: { score: number }) {
  if (score >= 95) return <span>★★★★★</span>;
  if (score >= 85) return <span>★★★★☆</span>;
  if (score >= 70) return <span>★★★☆☆</span>;
  if (score >= 50) return <span>★★☆☆☆</span>;
  return <span>★☆☆☆☆</span>;
}

function MatchBreakdown({
  breakdown,
}: {
  breakdown: {
    priority: number;
    secondary: number;
    keywords: number;
    location: number;
    relocation: number;
  };
}) {
  return (
    <div className="mt-4 grid gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-500 md:grid-cols-5">
      <p>Priority: +{breakdown.priority}</p>
      <p>Secondary: +{breakdown.secondary}</p>
      <p>Keywords: +{breakdown.keywords}</p>
      <p>Location: +{breakdown.location}</p>
      <p>Relocation: +{breakdown.relocation}</p>
    </div>
  );
}
