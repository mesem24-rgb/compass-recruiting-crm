import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";
import { candidates, dashboardStats, jobOrders } from "@/lib/data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="text-slate-500">
          Overview of candidates, jobs, interviews, and placements.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Recent Candidates</h2>

          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.name}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {candidate.name}
                  </p>
                  <p className="text-sm text-slate-500">{candidate.role}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {candidate.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Active Job Orders</h2>

          <div className="space-y-3">
            {jobOrders.map((job) => (
              <div
                key={job.title}
                className="rounded-lg border border-slate-100 p-3"
              >
                <div className="flex justify-between">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <span className="text-sm text-slate-500">{job.status}</span>
                </div>
                <p className="text-sm text-slate-500">{job.client}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {job.candidates} candidates submitted
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}