import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";
import {
  candidates,
  candidateStatusSummary,
  dashboardStats,
  jobOrders,
  quickActions,
  recentActivities,
} from "@/lib/data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="text-slate-500">
          Overview of candidates, jobs, interviews, and placements.
        </p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="font-semibold text-slate-950">{action.label}</p>
            <p className="mt-1 text-sm text-slate-500">{action.description}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Candidates by Status
          </h2>

          <div className="space-y-4">
            {candidateStatusSummary.map((item) => (
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
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.title}
                className="border-b border-slate-100 pb-3 last:border-0"
              >
                <p className="font-medium text-slate-950">{activity.title}</p>
                <p className="text-sm text-slate-500">{activity.description}</p>
                <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Recent Candidates
          </h2>

          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{candidate.name}</p>
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
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Active Job Orders
          </h2>

          <div className="space-y-3">
            {jobOrders.map((job) => (
              <div
                key={job.id}
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
