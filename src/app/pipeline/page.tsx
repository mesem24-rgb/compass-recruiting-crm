import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { candidates } from "@/lib/data";

const stages = ["New Lead", "Qualified", "Submitted", "Interview", "Offer", "Placed"];

export default function PipelinePage() {
  return (
    <AppShell>
      <PageHeader
        title="Recruiting Pipeline"
        description="Track candidate progress from first contact to final placement."
      />

      <div className="grid gap-4 overflow-x-auto xl:grid-cols-6">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter(
            (candidate) => candidate.status === stage,
          );

          return (
            <div
              key={stage}
              className="min-h-[500px] rounded-xl border border-slate-200 bg-slate-100 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{stage}</h2>
                <span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.name}
                    className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <p className="font-medium text-slate-950">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-slate-500">{candidate.role}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {candidate.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}