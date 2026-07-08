"use client";

import { useState } from "react";
import Link from "next/link";
import AddJobOrderModal from "@/components/job-orders/AddJobOrderModal";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import type { JobOrder } from "@/lib/job-orders";
import EmptyState from "../ui/EmptyState";

type JobOrdersPageClientProps = {
  jobOrders: JobOrder[];
};

export default function JobOrdersPageClient({
  jobOrders,
}: JobOrdersPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Job Orders"
        description="Track open roles, client needs, assigned recruiters, and submitted candidates."
        actionLabel="New Job Order"
        onAction={() => setModalOpen(true)}
      />

      {/* SECTION: Empty State */}

      {jobOrders.length === 0 && (
        <EmptyState
          title="No job orders."
          description="Create a job order to begin recruiting candidates."
        />
      )}

      {/* SECTION: Job Orders Table */}

      {jobOrders.length > 0 && (
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
                    <Link
                      href={`/job-orders/${job.id}`}
                      className="hover:underline"
                    >
                      {job.title}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {job.client ?? "No client listed"}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={job.status ?? "Open"} />
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={job.priority ?? "Medium"} />
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {job.candidates ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION: Add Job Order Modal */}

      <AddJobOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
