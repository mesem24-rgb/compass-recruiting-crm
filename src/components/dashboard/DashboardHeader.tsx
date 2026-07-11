"use client";

import PageHeader from "@/components/ui/PageHeader";
import { useModals } from "@/components/providers/ModalProvider";

export default function DashboardHeader() {
  const { openCandidateModal } = useModals();

  return (
    <PageHeader
      title="Dashboard"
      description="Live overview of candidates, clients, jobs, interviews, and placements."
      actionLabel="Add Candidate"
      onAction={openCandidateModal}
    />
  );
}