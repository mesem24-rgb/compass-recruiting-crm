"use client";

import { useState } from "react";
import Link from "next/link";
import AddClientModal from "@/components/clients/AddClientModal";
import PageHeader from "@/components/ui/PageHeader";
import type { Client } from "@/lib/clients";

type ClientsPageClientProps = {
  clients: Client[];
};

export default function ClientsPageClient({ clients }: ClientsPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Clients"
        description="Manage client companies, contacts, open jobs, and placement history."
        actionLabel="New Client"
        onAction={() => setModalOpen(true)}
      />

      {/* SECTION: Empty State */}

      {clients.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No clients have been added yet. Click New Client to create one.
        </div>
      )}

      {/* SECTION: Client Cards */}

      {clients.length > 0 && (
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
                Primary Contact: {client.contact ?? "No contact listed"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {client.location ?? "No location listed"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Open Jobs</p>
                  <p className="text-xl font-bold text-slate-950">
                    {client.open_jobs ?? 0}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Placements</p>
                  <p className="text-xl font-bold text-slate-950">
                    {client.placements ?? 0}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* SECTION: Add Client Modal */}

      <AddClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}