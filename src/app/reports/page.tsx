import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";

const reportStats = [
  { label: "Placements This Month", value: "7", change: "+3 vs last month" },
  { label: "Candidate Submissions", value: "38", change: "+12 this month" },
  { label: "Interviews Scheduled", value: "18", change: "This week" },
  { label: "Open Job Orders", value: "42", change: "Across active clients" },
];

const recruiterPerformance = [
  { recruiter: "Michael Sullivan", submissions: 18, interviews: 9, placements: 4 },
  { recruiter: "Hans Denton", submissions: 20, interviews: 9, placements: 3 },
];

const placementTrend = [
  { month: "Jan", value: 4 },
  { month: "Feb", value: 6 },
  { month: "Mar", value: 5 },
  { month: "Apr", value: 8 },
  { month: "May", value: 7 },
  { month: "Jun", value: 9 },
];

export default function ReportsPage() {
  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Reports"
        description="Review recruiting performance, placements, submissions, and recruiter activity."
      />

      {/* SECTION: Report KPI Cards */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((report) => (
          <div
            key={report.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{report.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {report.value}
            </p>
            <p className="mt-2 text-sm text-emerald-600">{report.change}</p>
          </div>
        ))}
      </section>

      {/* SECTION: Placement Trend */}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Monthly Placement Overview
            </h2>
            <p className="text-sm text-slate-500">
              Placement volume over the last six months.
            </p>
          </div>

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Export Report
          </button>
        </div>

        <div className="flex h-64 items-end gap-4">
          {placementTrend.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-slate-950"
                style={{ height: `${item.value * 10}%` }}
              />
              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Recruiter Performance */}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950">
          Recruiter Performance
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3">Recruiter</th>
                <th className="px-4 py-3">Submissions</th>
                <th className="px-4 py-3">Interviews</th>
                <th className="px-4 py-3">Placements</th>
              </tr>
            </thead>

            <tbody>
              {recruiterPerformance.map((item) => (
                <tr key={item.recruiter} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {item.recruiter}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.submissions}</td>
                  <td className="px-4 py-3 text-slate-600">{item.interviews}</td>
                  <td className="px-4 py-3 text-slate-600">{item.placements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: Report Notes */}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Management Notes
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Reporting will eventually pull live data from candidate activity,
          job order movement, recruiter submissions, interviews, placements,
          and revenue generated from completed searches.
        </p>
      </section>
    </AppShell>
  );
}