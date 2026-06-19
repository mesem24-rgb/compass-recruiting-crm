import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { getClientById } from "@/lib/clients";
import { jobOrders } from "@/lib/data";
import DeleteClientButton from "@/components/clients/DeleteClientButton";
import EditClientButton from "@/components/clients/EditClientButton";

type ClientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id } = await params;

  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  const clientJobs = jobOrders.filter((job) => job.client === client.company);

  return (
    <AppShell>
      {/* SECTION: Back Link */}

      <Link
        href="/clients"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← Back to Clients
      </Link>

      {/* SECTION: Client Header */}

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {client.industry}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950">
            {client.company}
          </h1>

          <p className="mt-1 text-slate-500">{client.location}</p>
        </div>

        <StatusBadge status={`${client.open_jobs ?? 0} Open Jobs`} />
      </div>

      {/* SECTION: Client Actions */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950">
          Client Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <EditClientButton client={client} />

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Job Order
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Contact
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Note
          </button>
          <DeleteClientButton clientId={client.id} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          {/* SECTION: Client Overview */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Client Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {client.industry ?? "No industry listed"}
              {client.location ?? "No location listed"}
              {client.contact ?? "No contact listed"}
              {client.email ?? "No email listed"}
              {client.phone ?? "No phone listed"}
              {String(client.open_jobs ?? 0)}
              {String(client.placements ?? 0)}
              {client.revenue ?? "$0"}
            </div>
          </div>

          {/* SECTION: Open Job Orders */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Open Job Orders
              </h2>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Add Job
              </button>
            </div>

            <div className="space-y-3">
              {clientJobs.map((job) => (
                <Link
                  href={`/job-orders/${job.id}`}
                  key={job.id}
                  className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-slate-950">{job.title}</p>
                      <p className="text-sm text-slate-500">
                        {job.location} · {job.salaryRange}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <StatusBadge status={job.status} />
                      <StatusBadge status={job.priority} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION: Client Activity */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-950">
              Client Activity
            </h2>

            <div className="space-y-4">
              <Activity
                title="New job order added"
                description="Regional Operations Manager was added to the account."
                time="Today"
              />

              <Activity
                title="Candidate submitted"
                description="Amanda Pierce was submitted for client review."
                time="2 days ago"
              />

              <Activity
                title="Placement completed"
                description="Client placement history updated."
                time="Last week"
              />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* SECTION: Client Contacts */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Client Contacts
            </h2>

            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="font-medium text-slate-950">{client.contact}</p>
              <p className="text-sm text-slate-500">{client.email}</p>
              <p className="text-sm text-slate-500">{client.phone}</p>
            </div>
          </div>

          {/* SECTION: Account Metrics */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Account Metrics
            </h2>

            <div className="mt-4 grid gap-3">
              <Metric label="Open Jobs" value={String(client.open_jobs ?? 0)} />
              <Metric label="Placements" value={String(client.placements ?? 0)} />
              <Metric label="Revenue" value={client.revenue ?? "$0"} />
            </div>
          </div>

          {/* SECTION: Client Notes */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Client Notes
            </h2>

            <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
              Client notes will be connected in a future database phase.
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function Activity({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <p className="font-medium text-slate-950">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <p className="mt-2 text-xs text-slate-400">{time}</p>
    </div>
  );
}
