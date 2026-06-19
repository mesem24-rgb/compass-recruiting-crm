import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { candidates } from "@/lib/data";
import { getJobOrderById } from "@/lib/job-orders";
import DeleteJobOrderButton from "@/components/job-orders/DeleteJobOrderButton";
import EditJobOrderButton from "@/components/job-orders/EditJobOrderButton";

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

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950">
          Job Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <EditJobOrderButton jobOrder={job} />

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Candidate
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Submit Candidate
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Close Job
          </button>
          <DeleteJobOrderButton jobOrderId={job.id} />
        </div>
      </div>

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
                value={String(job.candidates ?? 0)}
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

          {/* SECTION: Submitted Candidates */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Submitted Candidates
              </h2>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Add Candidate
              </button>
            </div>

            <div className="space-y-3">
              {candidates.map((candidate) => (
                <Link
                  href={`/candidates/${candidate.id}`}
                  key={candidate.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                >
                  <div>
                    <p className="font-medium text-slate-950">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-slate-500">{candidate.role}</p>
                  </div>

                  <StatusBadge status={candidate.status} />
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION: Job Activity */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
                description="Candidate submission tracking will be connected in a future phase."
                time="Coming soon"
              />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* SECTION: Job Status */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Job Status
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Status: {job.status ?? "Open"}</p>
              <p>Priority: {job.priority ?? "Medium"}</p>
              <p>Recruiter: {job.assigned_recruiter ?? "Unassigned"}</p>
            </div>
          </div>

          {/* SECTION: Quick Metrics */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Quick Metrics
            </h2>

            <div className="mt-4 grid gap-3">
              <Metric label="Submitted" value={String(job.candidates ?? 0)} />
              <Metric label="Interviewing" value="0" />
              <Metric label="Offers" value="0" />
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