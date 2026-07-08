"use client";

import { useState } from "react";
import type { Candidate } from "@/lib/candidates";
import type { JobOrder } from "@/lib/job-orders";
import DeleteJobOrderButton from "@/components/job-orders/DeleteJobOrderButton";
import EditJobOrderButton from "@/components/job-orders/EditJobOrderButton";
import SubmitCandidateModal from "@/components/job-orders/SubmitCandidateModal";
import ActionBar from "@/components/ui/ActionBar";

type JobOrderActionsProps = {
  jobOrder: JobOrder;
  candidates: Candidate[];
};

export default function JobOrderActions({
  jobOrder,
  candidates,
}: JobOrderActionsProps) {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  return (
    <>
      {/* SECTION: Job Actions */}

      <ActionBar title="Job Actions">
        <EditJobOrderButton jobOrder={jobOrder} />

        <button
          onClick={() => setSubmitModalOpen(true)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Submit Candidate
        </button>

        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Close Job
        </button>

        <DeleteJobOrderButton jobOrderId={jobOrder.id} />
      </ActionBar>

      {/* SECTION: Submit Candidate Modal */}

      <SubmitCandidateModal
        open={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        jobOrderId={jobOrder.id}
        candidates={candidates}
      />
    </>
  );
}
