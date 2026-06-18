import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { candidates, jobOrders } from "@/lib/data";

type JobOrderDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function JobOrderDetailPage({ params }: JobOrderDetailPageProps) {
  const { id } = await params;

  const job = jobOrders.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mb-6">
        <Link
          href="/job-orders"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back to Job Orders
        </Link>

        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">{job.title}</h1>
            <p className="text-slate-500">{job.client}</p>
          </div>

          <div className="flex gap-2">
            <StatusBadge status={job.status} />
            <StatusBadge status={job.priority} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Job Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Location" value={job.location} />
              <Info label="Salary Range" value={job.salaryRange} />
              <Info label="Assigned Recruiter" value={job.assignedRecruiter} />
              <Info label="Candidates Submitted" value={String(job.candidates)} />
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              {job.description}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Submitted Candidates
            </h2>

            <div className="mt-4 space-y-3">
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
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Quick Actions
            </h2>

            <div className="mt-4 space-y-3">
              <button className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white">
                Add Candidate
              </button>
              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                Update Status
              </button>
              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                Add Note
              </button>
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