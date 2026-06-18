import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { clients, jobOrders } from "@/lib/data";

type ClientDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const client = clients.find((item) => item.id === id);

  if (!client) {
    notFound();
  }

  const clientJobs = jobOrders.filter((job) => job.client === client.company);

  return (
    <AppShell>
      <div className="mb-6">
        <Link
          href="/clients"
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back to Clients
        </Link>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            {client.industry}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">
            {client.company}
          </h1>
          <p className="mt-1 text-slate-500">{client.location}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Client Overview
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Primary Contact" value={client.contact} />
              <Info label="Email" value={client.email} />
              <Info label="Phone" value={client.phone} />
              <Info label="Revenue Generated" value={client.revenue} />
              <Info label="Open Jobs" value={String(client.openJobs)} />
              <Info label="Placements" value={String(client.placements)} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Open Job Orders
            </h2>

            <div className="mt-4 space-y-3">
              {clientJobs.map((job) => (
                <Link
                  href={`/job-orders/${job.id}`}
                  key={job.id}
                  className="block rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100"
                >
                  <p className="font-medium text-slate-950">{job.title}</p>
                  <p className="text-sm text-slate-500">
                    {job.location} · {job.salaryRange}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Client Notes</h2>

          <div className="mt-4 space-y-3">
            {client.notes.map((note) => (
              <div
                key={note}
                className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600"
              >
                {note}
              </div>
            ))}
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