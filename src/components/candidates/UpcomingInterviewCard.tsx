import PageSection from "@/components/ui/PageSection";
import EmptyState from "@/components/ui/EmptyState";
import type { Interview } from "@/lib/interviews";
import InterviewStatusActions from "@/components/interviews/InterviewStatusActions";

type UpcomingInterviewCardProps = {
  interviews: Interview[];
};

export default function UpcomingInterviewCard({
  interviews,
}: UpcomingInterviewCardProps) {
  const upcomingInterview = interviews
    .filter((interview) => {
      if (!interview.interview_date || !interview.interview_time) {
        return false;
      }

      const interviewDateTime = new Date(
        `${interview.interview_date}T${interview.interview_time}`,
      );

      return (
        interview.status === "Scheduled" &&
        interviewDateTime.getTime() >= new Date().getTime()
      );
    })
    .sort((a, b) => {
      const firstDate = new Date(
        `${a.interview_date}T${a.interview_time}`,
      ).getTime();

      const secondDate = new Date(
        `${b.interview_date}T${b.interview_time}`,
      ).getTime();

      return firstDate - secondDate;
    })[0];

  return (
    <PageSection
      title="Upcoming Interview"
      description="The next scheduled interview for this candidate."
    >
      {upcomingInterview ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          {/* SECTION: Interview Header */}

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                {upcomingInterview.interview_type} Interview
              </p>

              <p className="mt-2 text-xl font-bold text-slate-950">
                {formatInterviewDate(
                  upcomingInterview.interview_date,
                  upcomingInterview.interview_time,
                )}
              </p>

              {upcomingInterview.timezone && (
                <p className="mt-1 text-sm text-slate-600">
                  Time zone: {upcomingInterview.timezone}
                </p>
              )}
            </div>

            <span className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {upcomingInterview.status}
            </span>
          </div>

          {/* SECTION: Interview Details */}

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <InterviewInfo
              label="Interviewer"
              value={upcomingInterview.interviewer ?? "Not assigned"}
            />

            <InterviewInfo
              label="Meeting Location"
              value={
                upcomingInterview.meeting_location ??
                "No meeting link or location"
              }
            />
          </div>

          {/* SECTION: Interview Notes */}

          {upcomingInterview.notes && (
            <div className="mt-4 rounded-lg border border-blue-100 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Interview Notes
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {upcomingInterview.notes}
              </p>
            </div>
          )}

          {/* SECTION: Interview Actions */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-blue-200 pt-4">
            {isMeetingLink(upcomingInterview.meeting_location) ? (
              <a
                href={upcomingInterview.meeting_location ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Open Meeting Link
              </a>
            ) : (
              <div />
            )}

            <InterviewStatusActions
              interviewId={upcomingInterview.id}
              currentStatus={upcomingInterview.status}
            />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No upcoming interview."
          description="Schedule an interview from the Candidate Actions section."
        />
      )}
    </PageSection>
  );
}

function InterviewInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-blue-100 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}

function formatInterviewDate(date: string, time: string) {
  return new Date(`${date}T${time}`).toLocaleString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isMeetingLink(value: string | null) {
  if (!value) return false;

  return value.startsWith("http://") || value.startsWith("https://");
}
