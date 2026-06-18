"use client";

import CandidateTable from "@/components/candidates/CandidateTable";
import { useModals } from "@/components/providers/ModalProvider";
import PageHeader from "@/components/ui/PageHeader";

export default function CandidatesPageClient() {
  const { openCandidateModal } = useModals();

  return (
    <>
      <PageHeader
        title="Candidates"
        description="Manage candidate profiles, status, notes, and recruiting activity."
        actionLabel="New Candidate"
        onAction={openCandidateModal}
      />

      <CandidateTable />
    </>
  );
}