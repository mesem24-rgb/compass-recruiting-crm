import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";

const upcomingInterviews = [
  {
    candidate: "Amanda Pierce",
    role: "Operations Manager",
    client: "Premier Hospitality Group",
    date: "Tuesday",
    time: "10:00 AM",
  },
  {
    candidate: "James Carter",
    role: "District Manager",
    client: "National Food Service Group",
    date: "Wednesday",
    time: "2:30 PM",
  },
  {
    candidate: "Rachel Nguyen",
    role: "General Manager",
    client: "Gulf Coast Retail Partners",
    date: "Friday",
    time: "11:15 AM",
  },
];

export default function CalendarPage() {
  return (
    <AppShell>
      {/* SECTION: Page Header */}

      <PageHeader
        title="Calendar"
        description="Track interviews, recruiter follow-ups, and client meetings."
      />

      {/* SECTION: Calendar Placeholder */}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Upcoming Interviews
        </h2>

        <div className="mt-4 space-y-4">
          {upcomingInterviews.map((interview) => (
            <div
              key={interview.candidate}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-slate-950">
                    {interview.candidate}
                  </p>
                  <p className="text-sm text-slate-500">
                    {interview.role} · {interview.client}
                  </p>
                </div>

                <p className="text-sm font-medium text-slate-700">
                  {interview.date} · {interview.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Future Calendar Integration */}

      <section className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Calendar Integration Coming Later
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Future versions can connect Google Calendar or Outlook to schedule
          interviews, sync recruiter availability, and send reminders.
        </p>
      </section>
    </AppShell>
  );
}