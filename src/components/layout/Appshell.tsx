import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}