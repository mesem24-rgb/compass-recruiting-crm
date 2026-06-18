import CandidateTable from "@/components/candidates/CandidateTable";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";

export default function CandidatesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Candidates"
        description="Manage candidate profiles, status, notes, and recruiting activity."
        actionLabel="New Candidate"
      />

      <CandidateTable />
    </AppShell>
  );
}