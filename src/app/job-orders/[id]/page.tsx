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
import EmptyState from "@/components/ui/EmptyState";
import { buildRecommendation } from "@/lib/recommendations";
import { getAssignmentLockStatus } from "@/lib/job-orders";

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

  const lockStatus = getAssignmentLockStatus(job);

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

          <PageSection
            title="Job Overview"
            description="Overview of the selected job order."
          >
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
          </PageSection>

          {/* SECTION: Matching Candidates */}

          <PageSection
            title="Matching Candidates"
            description="Ranked by skills, keywords, location, and relocation fit."
          >
            <div className="space-y-3">
              {matches.length > 0 ? (
                matches.map((match) => {
                  const recommendations = buildRecommendation(match);

                  return (
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
                          <p className="text-lg tracking-wide text-amber-400">
                            <MatchStars score={match.score} />
                          </p>

                          <p className="mt-2 text-2xl font-bold text-slate-950">
                            <MatchLabel score={match.score} />
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-500">
                            {match.score}% Match
                          </p>

                          <MatchGauge score={match.score} />
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

                      <div className="mt-4 rounded-xl border border-sky-200 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xl">
                            🤖
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">
                              Compass Match Analysis
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              This recommendation is generated using skills,
                              keywords, location, relocation preferences, and
                              overall candidate fit.
                            </p>
                            <div className="mt-3">
                              <MatchConfidence score={match.score} />
                            </div>
                          </div>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {recommendations.map((reason) => (
                            <li
                              key={reason}
                              className="flex items-start gap-2 text-sm text-slate-700"
                            >
                              <span className="mt-0.5 text-emerald-600">✓</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>

                        {(match.missingPrioritySkills.length > 0 ||
                          match.missingSecondarySkills.length > 0) && (
                          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <p className="mb-2 text-sm font-semibold text-slate-900">
                              Needs Improvement
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {match.missingPrioritySkills.map((skill) => (
                                <span
                                  key={`missing-priority-${skill}`}
                                  className="rounded-full bg-white px-2 py-1 text-xs font-medium text-amber-700"
                                >
                                  Missing Priority: {skill}
                                </span>
                              ))}

                              {match.missingSecondarySkills.map((skill) => (
                                <span
                                  key={`missing-secondary-${skill}`}
                                  className="rounded-full bg-white px-2 py-1 text-xs font-medium text-amber-700"
                                >
                                  Missing Secondary: {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

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
                  );
                })
              ) : (
                <EmptyState
                  title="No matching candidates found."
                  description="Add priority skills, keywords, or preferred locations to this job order to generate recommendations."
                />
              )}
            </div>
          </PageSection>

          {/* SECTION: Submitted Candidates */}

          <PageSection
            title="Submitted Candidates"
            description="Candidates that have been submitted to this job."
          >
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
                <EmptyState
                  title="No candidates have been submitted yet."
                  description="Submit candidates from the Matching Candidates section to begin tracking the recruiting process."
                />
              )}
            </div>
          </PageSection>

          {/* SECTION: Job Activity */}

          <PageSection
            title="Job Activity"
            description="Recent updates and changes to this job order."
          >
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
            description="Current hiring status and recruiter assignment."
          >
            <div className="mt-4 grid gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {job.status ?? "Open"}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Priority
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {job.priority ?? "Medium"}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Assigned Recruiter
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {job.assigned_recruiter ?? "Unassigned"}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Recruiter Assignment
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {lockStatus.label}
                </p>

                {lockStatus.isLocked && job.assigned_recruiter && (
                  <p className="mt-1 text-xs text-slate-500">
                    Exclusive to {job.assigned_recruiter}
                  </p>
                )}
              </div>
            </div>
          </PageSection>

          {/* SECTION: Quick Metrics */}

          <PageSection
            title="Quick Metrics"
            description="Real-time recruiting metrics for this job."
          >
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

function MatchConfidence({ score }: { score: number }) {
  if (score >= 90) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        🟢 High Confidence
      </span>
    );
  }

  if (score >= 75) {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
        🔵 Strong Match
      </span>
    );
  }

  if (score >= 60) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        🟡 Potential Match
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
      ⚪ Low Match
    </span>
  );
}

function MatchGauge({ score }: { score: number }) {
  return (
    <div className="mt-2 w-32">
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${
            score >= 90
              ? "bg-emerald-500"
              : score >= 75
                ? "bg-blue-500"
                : score >= 60
                  ? "bg-amber-400"
                  : "bg-slate-400"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
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

function MatchLabel({ score }: { score: number }) {
  if (score >= 90) return <span>Excellent Match</span>;
  if (score >= 75) return <span>Strong Match</span>;
  if (score >= 60) return <span>Potential Match</span>;
  return <span>Low Match</span>;
}
