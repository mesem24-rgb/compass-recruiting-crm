import CandidatesPageClient from "@/components/candidates/CandidatesPageClient";
import AppShell from "@/components/layout/AppShell";
import { getCandidates } from "@/lib/candidates";

export default async function CandidatesPage() {
  const candidates = await getCandidates();

  return (
    <AppShell>
      {/* SECTION: Candidates Page Client */}

      <CandidatesPageClient candidates={candidates} />
    </AppShell>
  );
}