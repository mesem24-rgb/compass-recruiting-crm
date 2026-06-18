import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ModalProvider } from "@/components/providers/ModalProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <main className="min-h-screen xl:pl-64">
          <Topbar />
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </ModalProvider>
  );
}