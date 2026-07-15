import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import PageSection from "@/components/ui/PageSection";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import NotificationList from "@/components/recruiter/NotificationList";
import { getCandidates } from "@/lib/candidates";
import { getJobOrders, getAssignmentLockStatus } from "@/lib/job-orders";
import { getSubmissionsForJobOrder } from "@/lib/submissions";
import { buildRecruiterNotifications } from "@/lib/notifications";
import { getUpcomingInterviews } from "@/lib/interviews";

const currentRecruiter = "Michael Sullivan";
const currentRecruiterId = "michael-sullivan";

export default async function RecruiterWorkspacePage() {
  const [candidates, jobOrders, upcomingInterviews] = await Promise.all([
    getCandidates(),
    getJobOrders(),
    getUpcomingInterviews(),
  ]);

  const assignedJobs = jobOrders.filter(
    (job) =>
      job.assigned_recruiter === currentRecruiter ||
      job.assigned_recruiter_id === currentRecruiterId,
  );

  const replacementJobs = assignedJobs.filter(
    (job) => job.replacement_priority === true,
  );

  const lockedJobs = assignedJobs.filter(
    (job) => job.assignment_locked === true,
  );

  const jobsNearExpiration = lockedJobs.filter((job) => {
    const lockStatus = getAssignmentLockStatus(job);

    return (
      lockStatus.isLocked &&
      lockStatus.daysRemaining !== null &&
      lockStatus.daysRemaining <= 7
    );
  });

  const myCandidates = candidates.filter(
    (candidate) => candidate.recruiter === currentRecruiter,
  );

  const myCandidateIds = new Set(myCandidates.map((candidate) => candidate.id));

  const myUpcomingInterviews = upcomingInterviews
    .filter((interview) => myCandidateIds.has(interview.candidate_id))
    .slice(0, 5);

  const interviews = myCandidates.filter(
    (candidate) => candidate.status === "Interview",
  ).length;

  const placements = myCandidates.filter(
    (candidate) => candidate.status === "Placed",
  ).length;

  const notifications = buildRecruiterNotifications({
    candidates: myCandidates,
    jobOrders: assignedJobs,
    interviews: myUpcomingInterviews,
  });

  const submissionGroups = await Promise.all(
    assignedJobs.map(async (job) => ({
      job,
      submissions: await getSubmissionsForJobOrder(job.id),
    })),
  );

  const totalSubmissions = submissionGroups.reduce(
    (total, group) => total + group.submissions.length,
    0,
  );

  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Recruiter Workspace"
        description="Manage your assignments, submissions, and recruiting workload."
      />

      {/* SECTION: Recruiter KPIs */}

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <WorkspaceStat label="Assigned Jobs" value={assignedJobs.length} />
        <WorkspaceStat label="Candidates Submitted" value={totalSubmissions} />
        <WorkspaceStat label="Interviews" value={interviews} />
        <WorkspaceStat label="Placements" value={placements} />
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* SECTION: Recruiter Daily Brief */}

        <PageSection
          title={`Good morning, ${currentRecruiter.split(" ")[0]}`}
          description="A quick summary of the recruiting work that needs your attention."
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              You currently have{" "}
              <span className="font-semibold text-slate-950">
                {assignedJobs.length} assigned job
                {assignedJobs.length === 1 ? "" : "s"}
              </span>
              ,{" "}
              <span className="font-semibold text-red-700">
                {replacementJobs.length} replacement-priority role
                {replacementJobs.length === 1 ? "" : "s"}
              </span>
              , and{" "}
              <span className="font-semibold text-amber-700">
                {jobsNearExpiration.length} assignment lock
                {jobsNearExpiration.length === 1 ? "" : "s"} expiring soon
              </span>
              .
            </p>

            <div className="mt-4 space-y-2">
              {replacementJobs.length > 0 && (
                <BriefItem
                  tone="red"
                  text={`Review ${replacementJobs.length} replacement-priority job${
                    replacementJobs.length === 1 ? "" : "s"
                  }.`}
                />
              )}

              {jobsNearExpiration.length > 0 && (
                <BriefItem
                  tone="amber"
                  text={`${jobsNearExpiration.length} recruiter lock${
                    jobsNearExpiration.length === 1 ? "" : "s"
                  } expire within 7 days.`}
                />
              )}

              {interviews > 0 && (
                <BriefItem
                  tone="emerald"
                  text={`${interviews} candidate${
                    interviews === 1 ? " is" : "s are"
                  } currently in the interview stage.`}
                />
              )}

              {myCandidates.length === 0 && assignedJobs.length === 0 && (
                <BriefItem
                  tone="slate"
                  text="No urgent recruiting activity is assigned right now."
                />
              )}
            </div>
          </div>
        </PageSection>

        {/* SECTION: Notifications */}

        <PageSection
          title="Notifications"
          description="Recent recruiting activity and assignment alerts."
        >
          <NotificationList notifications={notifications} />
        </PageSection>

        {/* SECTION: My Day */}

        <PageSection
          title="My Day"
          description="Priority actions based on your current recruiting workload."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TaskCard
              label="Replacement Jobs"
              value={replacementJobs.length}
              tone="red"
              description="High-priority roles requiring immediate attention."
            />

            <TaskCard
              label="Locks Expiring Soon"
              value={jobsNearExpiration.length}
              tone="amber"
              description="Assignments opening to other recruiters within 7 days."
            />

            <TaskCard
              label="Candidates to Review"
              value={
                myCandidates.filter(
                  (candidate) =>
                    (candidate.status ?? "Qualified") === "New Lead" ||
                    candidate.status === "Qualified",
                ).length
              }
              tone="blue"
              description="Candidates waiting for review or submission."
            />

            <TaskCard
              label="Interviews in Progress"
              value={interviews}
              tone="emerald"
              description="Candidates currently in the interview stage."
            />
          </div>
        </PageSection>

        {/* SECTION: Assigned Jobs */}

        <PageSection
          title="My Assigned Jobs"
          description="Open job orders currently assigned to this recruiter."
        >
          <div className="space-y-3">
            {assignedJobs.length > 0 ? (
              assignedJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <EmptyState
                title="No assigned jobs."
                description="Assigned jobs will appear here once recruiter ownership is set."
              />
            )}
          </div>
        </PageSection>

        {/* SECTION: Lock Expiration */}

        <PageSection
          title="Jobs Near Lock Expiration"
          description="Locked assignments that are close to opening to other recruiters."
        >
          <div className="space-y-3">
            {jobsNearExpiration.length > 0 ? (
              jobsNearExpiration.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <EmptyState
                title="No locks expiring soon."
                description="Jobs with exclusivity ending within 7 days will appear here."
              />
            )}
          </div>
        </PageSection>

        {/* SECTION: Replacement Priority */}

        <PageSection
          title="Replacement Priority"
          description="High-priority replacement roles requiring immediate attention."
        >
          <div className="space-y-3">
            {replacementJobs.length > 0 ? (
              replacementJobs.map((job) => (
                <JobCard key={job.id} job={job} priority />
              ))
            ) : (
              <EmptyState
                title="No replacement priority jobs."
                description="Replacement roles will appear here when marked as priority."
              />
            )}
          </div>
        </PageSection>

        {/* SECTION: Upcoming Interviews */}

        <PageSection
          title="Upcoming Interviews"
          description="The next scheduled interviews for your candidates."
        >
          <div className="space-y-3">
            {myUpcomingInterviews.length > 0 ? (
              myUpcomingInterviews.map((interview) => {
                const candidate = myCandidates.find(
                  (item) => item.id === interview.candidate_id,
                );

                if (!candidate) return null;

                return (
                  <Link
                    key={interview.id}
                    href={`/candidates/${candidate.id}`}
                    className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-slate-950">
                          {candidate.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {candidate.role ?? "No role listed"}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          {new Date(
                            `${interview.interview_date}T${interview.interview_time}`,
                          ).toLocaleString([], {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {interview.interview_type}
                        </span>

                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                          {interview.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <EmptyState
                title="No upcoming interviews."
                description="Scheduled candidate interviews will appear here."
              />
            )}
          </div>
        </PageSection>

        {/* SECTION: Recent Candidate Activity */}

        <PageSection
          title="Recent Candidate Activity"
          description="Recently created candidates assigned to this recruiter."
        >
          <div className="space-y-3">
            {myCandidates.length > 0 ? (
              myCandidates.slice(0, 5).map((candidate) => (
                <Link
                  href={`/candidates/${candidate.id}`}
                  key={candidate.id}
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

                  <StatusBadge status={candidate.status ?? "Qualified"} />
                </Link>
              ))
            ) : (
              <EmptyState
                title="No candidate activity."
                description="Candidates assigned to this recruiter will appear here."
              />
            )}
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}

function WorkspaceStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function JobCard({
  job,
  priority = false,
}: {
  job: {
    id: string;
    title: string;
    client: string | null;
    status: string | null;
    priority: string | null;
    exclusive_until: string | null;
    assignment_locked: boolean | null;
    replacement_priority: boolean | null;
  };
  priority?: boolean;
}) {
  return (
    <Link
      href={`/job-orders/${job.id}`}
      className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-slate-950">{job.title}</p>
          <p className="text-sm text-slate-500">
            {job.client ?? "No client listed"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusBadge status={job.status ?? "Open"} />
          <StatusBadge status={job.priority ?? "Medium"} />

          {priority && (
            <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
              Replacement
            </span>
          )}

          {job.assignment_locked && (
            <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
              Locked
            </span>
          )}
        </div>
      </div>

      {job.exclusive_until && (
        <LockCountdown
          exclusiveUntil={job.exclusive_until}
          assignmentLocked={job.assignment_locked ?? false}
        />
      )}
    </Link>
  );
}

/* SECTION: Lock Countdown */

function LockCountdown({
  exclusiveUntil,
  assignmentLocked,
}: {
  exclusiveUntil: string;
  assignmentLocked: boolean;
}) {
  const today = new Date();
  const expirationDate = new Date(exclusiveUntil);

  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (!assignmentLocked || daysRemaining < 0) {
    return (
      <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
        Open to all recruiters
      </div>
    );
  }

  if (daysRemaining === 0) {
    return (
      <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
        Exclusivity expires today
      </div>
    );
  }

  const tone =
    daysRemaining <= 3
      ? "border-red-200 bg-red-50 text-red-700"
      : daysRemaining <= 7
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-slate-200 bg-white text-slate-600";

  return (
    <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${tone}`}>
      <div className="flex items-center justify-between gap-3">
        <span>Exclusive until {expirationDate.toLocaleDateString()}</span>

        <span className="font-semibold">
          {daysRemaining} day{daysRemaining === 1 ? "" : "s"} remaining
        </span>
      </div>
    </div>
  );
}

function TaskCard({
  label,
  value,
  description,
  tone,
}: {
  label: string;
  value: number;
  description: string;
  tone: "red" | "amber" | "blue" | "emerald";
}) {
  const toneClasses = {
    red: "border-red-200 bg-red-50 text-red-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="mt-1 text-xs opacity-80">{description}</p>
        </div>

        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}

function BriefItem({
  text,
  tone,
}: {
  text: string;
  tone: "red" | "amber" | "emerald" | "slate";
}) {
  const toneClasses = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    slate: "bg-slate-400",
  };

  return (
    <div className="flex items-start gap-3 text-sm text-slate-700">
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneClasses[tone]}`}
      />
      <p>{text}</p>
    </div>
  );
}
