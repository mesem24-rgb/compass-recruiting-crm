import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { candidates } from "@/lib/data";

const stages = ["New Lead", "Qualified", "Submitted", "Interview", "Offer", "Placed"];

const pipelineSummary = [
  { label: "Total Candidates", value: "126" },
  { label: "In Interviews", value: "18" },
  { label: "Offers Pending", value: "9" },
  { label: "Placements", value: "7" },
];

export default function PipelinePage() {
  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Recruiting Pipeline"
        description="Track candidate progress from first contact to final placement."
      />

      {/* SECTION: Pipeline Summary */}

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pipelineSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* SECTION: Pipeline Board */}

      <section className="overflow-x-auto pb-4">
        <div className="grid min-w-[1100px] gap-4 xl:grid-cols-6">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter(
              (candidate) => candidate.status === stage,
            );

            return (
              <div
                key={stage}
                className="min-h-[520px] rounded-xl border border-slate-200 bg-slate-100 p-4"
              >
                {/* SECTION: Pipeline Column Header */}

                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">{stage}</h2>

                  <span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* SECTION: Pipeline Cards */}

                <div className="space-y-3">
                  {stageCandidates.length > 0 ? (
                    stageCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                      >
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-slate-950">
                              {candidate.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {candidate.role}
                            </p>
                          </div>

                          <StatusBadge status={candidate.status} />
                        </div>

                        <div className="space-y-1 text-xs text-slate-500">
                          <p>{candidate.location}</p>
                          <p>Recruiter: {candidate.recruiter}</p>
                          <p>Last Contact: {candidate.lastContact}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-4 text-center text-sm text-slate-400">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}