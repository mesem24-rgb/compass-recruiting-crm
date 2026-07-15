import PageSection from "@/components/ui/PageSection";
import type { Interview } from "@/lib/interviews";

const timelineSteps = [
  "Applied",
  "Qualified",
  "Submitted",
  "Interview",
  "Placed",
];

type CandidateTimelineProps = {
  currentStatus?: string | null;
  interviews: Interview[];
};

export default function CandidateTimeline({
  currentStatus,
  interviews,
}: CandidateTimelineProps) {
  const activeIndex = timelineSteps.findIndex(
    (step) => step === (currentStatus ?? "Qualified"),
  );

  const upcomingInterview = interviews.find((interview) => {
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
});

  return (
    <PageSection
      title="Hiring Timeline"
      description="Current progress through the recruiting process."
    >
      <div className="grid gap-4 md:grid-cols-5">
        {timelineSteps.map((step, index) => {
          const isComplete = activeIndex >= index;
          const isCurrent = activeIndex === index;

          return (
            <div
              key={step}
              className={`rounded-xl border p-4 text-center ${
                isCurrent
                  ? "border-blue-300 bg-blue-50"
                  : isComplete
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : isComplete
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`text-sm font-medium ${
                  isCurrent
                    ? "text-blue-700"
                    : isComplete
                      ? "text-emerald-700"
                      : "text-slate-500"
                }`}
              >
                {step === "Interview" && upcomingInterview && (
                  <div className="mt-3 text-xs text-slate-600">
                    <p className="font-medium">
                      {new Date(
                        `${upcomingInterview.interview_date}T${upcomingInterview.interview_time}`,
                      ).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>

                    <p className="mt-1">{upcomingInterview.interview_type}</p>
                  </div>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
