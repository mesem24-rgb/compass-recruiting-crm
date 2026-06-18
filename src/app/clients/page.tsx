import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { clients } from "@/lib/data";

export default function ClientsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Clients"
        description="Manage client companies, contacts, open jobs, and placement history."
        actionLabel="New Client"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <Link
            href={`/clients/${client.id}`}
            key={client.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {client.company}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Primary Contact: {client.contact}
            </p>

            <p className="mt-1 text-sm text-slate-500">{client.location}</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Open Jobs</p>
                <p className="text-xl font-bold text-slate-950">
                  {client.openJobs}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Placements</p>
                <p className="text-xl font-bold text-slate-950">
                  {client.placements}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}