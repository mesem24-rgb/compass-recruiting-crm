import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { candidates } from "@/lib/data";

type CandidateDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const { id } = await params;

  const candidate = candidates.find((item) => item.id === id);

  if (!candidate) {
    notFound();
  }

  return (
    <AppShell>
      {/* SECTION: Back Link */}

      <Link
        href="/candidates"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← Back to Candidates
      </Link>

      {/* SECTION: Candidate Header */}

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            {candidate.name}
          </h1>
          <p className="text-slate-500">{candidate.role}</p>
        </div>

        <StatusBadge status={candidate.status} />
      </div>

      {/* SECTION: Candidate Actions */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950">
          Candidate Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Edit Candidate
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Schedule Interview
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Submit to Client
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Note
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          {/* SECTION: Candidate Overview */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Candidate Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Email" value={candidate.email} />
              <Info label="Phone" value={candidate.phone} />
              <Info label="Location" value={candidate.location} />
              <Info label="Source" value={candidate.source} />
              <Info label="Experience" value={candidate.experience} />
              <Info label="Target Salary" value={candidate.salary} />
              <Info label="Recruiter" value={candidate.recruiter} />
              <Info label="Last Contact" value={candidate.lastContact} />
            </div>
          </div>

          {/* SECTION: Hiring Timeline */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-950">
              Hiring Timeline
            </h2>

            <div className="grid gap-4 md:grid-cols-5">
              {["Applied", "Qualified", "Submitted", "Interview", "Placed"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-xl border border-slate-200 p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium text-slate-700">{step}</p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* SECTION: Recruiter Notes */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Recruiter Notes
              </h2>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Add Note
              </button>
            </div>

            <div className="space-y-4">
              {candidate.notes.map((note) => (
                <div
                  key={note}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-700">{note}</p>

                  <p className="mt-2 text-xs text-slate-400">
                    {candidate.recruiter} • Recent activity
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* SECTION: Quick Actions */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Quick Actions
            </h2>

            <div className="mt-4 space-y-3">
              <button className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Add Note
              </button>

              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Schedule Interview
              </button>

              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Submit to Client
              </button>

              <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Upload Resume
              </button>
            </div>
          </div>

          {/* SECTION: Pipeline Status */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Pipeline Status
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Current Stage: {candidate.status}</p>
              <p>Assigned Recruiter: {candidate.recruiter}</p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}