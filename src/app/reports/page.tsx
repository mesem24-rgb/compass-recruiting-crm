import AppShell from "@/components/layout/AppShell";

const reports = [
  { label: "Placements This Month", value: "7" },
  { label: "Candidate Submissions", value: "38" },
  { label: "Interviews Scheduled", value: "18" },
  { label: "Open Job Orders", value: "42" },
];

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
        <p className="text-slate-500">
          Review recruiting performance, placements, and activity metrics.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <div
            key={report.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{report.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {report.value}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Monthly Placement Overview
        </h2>

        <div className="mt-6 flex h-64 items-end gap-4">
          {[40, 65, 50, 85, 70, 95].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-slate-900"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-slate-500">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}