import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ModalProvider from "@/components/providers/ModalProvider";
import { getCandidates } from "@/lib/candidates";
import { getJobOrders } from "@/lib/job-orders";
import { buildRecruiterNotifications } from "@/lib/notifications";

export default async function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const [candidates, jobOrders] = await Promise.all([
    getCandidates(),
    getJobOrders(),
  ]);

  const notifications = buildRecruiterNotifications({
    candidates,
    jobOrders,
  });

  return (
    <ModalProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <main className="min-h-screen xl:pl-64">
          <Topbar notifications={notifications} />

          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </ModalProvider>
  );
}