"use client";

import CandidateTable from "@/components/candidates/CandidateTable";
import { useModals } from "@/components/providers/ModalProvider";
import PageHeader from "@/components/ui/PageHeader";
import type { Candidate } from "@/lib/candidates";

type CandidatesPageClientProps = {
  candidates: Candidate[];
};

export default function CandidatesPageClient({
  candidates,
}: CandidatesPageClientProps) {
  const { openCandidateModal } = useModals();

  return (
    <>
      <PageHeader
        title="Candidates"
        description="Manage candidate profiles, status, notes, and recruiting activity."
        actionLabel="New Candidate"
        onAction={openCandidateModal}
      />
{/* SECTION: Candidate Table */}
      <CandidateTable candidates={candidates} />
    </>
  );
}