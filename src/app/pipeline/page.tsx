import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import PipelineBoard from "@/components/pipeline/PipelineBoard";
import { getCandidates } from "@/lib/candidates";

export default async function PipelinePage() {
  const candidates = await getCandidates();

  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Recruiting Pipeline"
        description="Track candidate progress from first contact to final placement."
      />

      {/* SECTION: Pipeline Board */}

      <PipelineBoard candidates={candidates} />
    </AppShell>
  );
}