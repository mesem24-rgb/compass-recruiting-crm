import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { jobOrders } from "@/lib/data";

export default function JobOrdersPage() {
  return (
    <AppShell>
      <PageHeader
        title="Job Orders"
        description="Track open roles, client needs, assigned recruiters, and submitted candidates."
        actionLabel="New Job Order"
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Candidates</th>
            </tr>
          </thead>

          <tbody>
            {jobOrders.map((job) => (
              <tr
                key={job.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  <Link href={`/job-orders/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{job.client}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={job.priority} />
                </td>
                <td className="px-4 py-3 text-slate-600">{job.candidates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}