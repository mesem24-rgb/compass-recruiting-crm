import ClientsPageClient from "@/components/clients/ClientsPageClient";
import AppShell from "@/components/layout/AppShell";
import { getClients } from "@/lib/clients";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <AppShell>
      {/* SECTION: Clients Page Client */}

      <ClientsPageClient clients={clients} />
    </AppShell>
  );
}