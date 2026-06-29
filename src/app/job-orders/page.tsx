import JobOrdersPageClient from "@/components/job-orders/JobOrdersPageClient";
import AppShell from "@/components/layout/AppShell";
import { getJobOrders } from "@/lib/job-orders";


export default async function JobOrdersPage() {
  const jobOrders = await getJobOrders();

  return (
    <AppShell>
      {/* SECTION: Job Orders Page Client */}

      <JobOrdersPageClient jobOrders={jobOrders} />
    </AppShell>
  );
}