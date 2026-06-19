import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";

const settingsGroups = [
  {
    title: "User Management",
    description: "Manage recruiters, roles, permissions, and access levels.",
  },
  {
    title: "Pipeline Configuration",
    description: "Customize candidate stages, statuses, and workflow steps.",
  },
  {
    title: "Notifications",
    description: "Configure email reminders, interview alerts, and follow-ups.",
  },
  {
    title: "Integrations",
    description: "Connect email, calendar, job boards, and future AI tools.",
  },
];

export default function SettingsPage() {
  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Settings"
        description="Configure CRM preferences, user roles, and future integrations."
      />

      {/* SECTION: Settings Cards */}

      <section className="grid gap-4 md:grid-cols-2">
        {settingsGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              {group.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {group.description}
            </p>

            <button className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Configure
            </button>
          </div>
        ))}
      </section>
    </AppShell>
  );
}