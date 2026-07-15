import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { getCandidates } from "@/lib/candidates";
import { getClients } from "@/lib/clients";
import { getJobOrders } from "@/lib/job-orders";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardPage() {
  const [candidates, clients, jobOrders] = await Promise.all([
    getCandidates(),
    getClients(),
    getJobOrders(),
  ]);

  const interviews = candidates.filter(
    (candidate) => candidate.status === "Interview",
  ).length;

  const placements = candidates.filter(
    (candidate) => candidate.status === "Placed",
  ).length;

  const openJobs = jobOrders.filter(
    (job) => (job.status ?? "Open") === "Open",
  ).length;

  const dashboardStats = [
    { label: "Open Positions", value: String(openJobs), change: "Live job orders" },
    {
      label: "Candidates",
      value: String(candidates.length),
      change: "Total candidate records",
    },
    {
      label: "Interviews",
      value: String(interviews),
      change: "Candidates in interview stage",
    },
    {
      label: "Placements",
      value: String(placements),
      change: "Placed candidates",
    },
  ];

  const candidateStatusSummary = [
    "New Lead",
    "Qualified",
    "Submitted",
    "Interview",
    "Offer",
    "Placed",
  ].map((status) => ({
    label: status,
    value: candidates.filter(
      (candidate) => (candidate.status ?? "Qualified") === status,
    ).length,
  }));

  const recentCandidates = candidates.slice(0, 3);
  const recentJobs = jobOrders.slice(0, 3);

  return (
    <AppShell>

      <DashboardHeader />

      {/* SECTION: Quick Actions */}

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <Link
          href="/candidates"
          className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <p className="font-semibold text-slate-950">Add Candidate</p>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage candidate records.
          </p>
        </Link>

        <Link
          href="/job-orders"
          className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <p className="font-semibold text-slate-950">New Job Order</p>
          <p className="mt-1 text-sm text-slate-500">
            Add and manage open recruiting assignments.
          </p>
        </Link>

        <Link
          href="/clients"
          className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <p className="font-semibold text-slate-950">Add Client</p>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage client accounts.
          </p>
        </Link>
      </section>

      {/* SECTION: KPI Cards */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* SECTION: Analytics and Activity */}

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Candidates by Status
          </h2>

          <div className="space-y-4">
            {candidateStatusSummary.map((item) => {
              const width =
                candidates.length === 0
                  ? 0
                  : Math.max((item.value / candidates.length) * 100, 5);

              return (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-slate-500">{item.value}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-slate-950"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Account Summary
          </h2>

          <div className="space-y-4">
            <SummaryRow label="Clients" value={clients.length} />
            <SummaryRow label="Job Orders" value={jobOrders.length} />
            <SummaryRow label="Candidates" value={candidates.length} />
          </div>
        </div>
      </section>

      {/* SECTION: Recent Records */}

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Recent Candidates
          </h2>

          <div className="space-y-3">
            {recentCandidates.length > 0 ? (
              recentCandidates.map((candidate) => (
                <Link
                  href={`/candidates/${candidate.id}`}
                  key={candidate.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">
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
              <p className="text-sm text-slate-500">
                No candidates have been added yet.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Active Job Orders
          </h2>

          <div className="space-y-3">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <Link
                  href={`/job-orders/${job.id}`}
                  key={job.id}
                  className="block rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div className="flex justify-between gap-3">
                    <p className="font-medium text-slate-900">{job.title}</p>
                    <StatusBadge status={job.status ?? "Open"} />
                  </div>

                  <p className="text-sm text-slate-500">
                    {job.client ?? "No client listed"}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {job.candidates ?? 0} candidates submitted
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No job orders have been added yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-xl font-bold text-slate-950">{value}</p>
    </div>
  );
}