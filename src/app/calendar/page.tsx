import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import InterviewCalendarClient from "@/components/calendar/InterviewCalendarClient";
import { getCandidates } from "@/lib/candidates";
import { getUpcomingInterviews } from "@/lib/interviews";

export default async function CalendarPage() {
  const [candidates, interviews] = await Promise.all([
    getCandidates(),
    getUpcomingInterviews(),
  ]);

  return (
    <AppShell>
      <PageHeader
        title="Calendar"
        description="View upcoming candidate interviews and recruiting events."
      />

      <div className="mt-6">
        <InterviewCalendarClient
          candidates={candidates}
          interviews={interviews}
        />
      </div>
    </AppShell>
  );
}