"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import PageSection from "@/components/ui/PageSection";
import type { Candidate } from "@/lib/candidates";
import type { Interview } from "@/lib/interviews";

type InterviewCalendarClientProps = {
  candidates: Candidate[];
  interviews: Interview[];
};

type RangeFilter = "7" | "30" | "90" | "all";

export default function InterviewCalendarClient({
  candidates,
  interviews,
}: InterviewCalendarClientProps) {
  const [range, setRange] = useState<RangeFilter>("30");

  const candidateMap = useMemo(
    () =>
      new Map(
        candidates.map((candidate) => [candidate.id, candidate]),
      ),
    [candidates],
  );

  const filteredInterviews = useMemo(() => {
    if (range === "all") {
      return interviews;
    }

    const now = new Date();
    const rangeEnd = new Date();

    rangeEnd.setDate(rangeEnd.getDate() + Number(range));

    return interviews.filter((interview) => {
      if (!interview.interview_date || !interview.interview_time) {
        return false;
      }

      const interviewDateTime = new Date(
        `${interview.interview_date}T${interview.interview_time}`,
      );

      return interviewDateTime >= now && interviewDateTime <= rangeEnd;
    });
  }, [interviews, range]);

  const groupedInterviews = useMemo(() => {
    return filteredInterviews.reduce<Record<string, Interview[]>>(
      (groups, interview) => {
        const date = interview.interview_date;

        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(interview);

        return groups;
      },
      {},
    );
  }, [filteredInterviews]);

  const interviewDates = Object.keys(groupedInterviews).sort();

  return (
    <>
      {/* SECTION: Calendar Filters */}

      <div className="mb-6 flex flex-wrap gap-2">
        <RangeButton
          label="Next 7 Days"
          value="7"
          activeRange={range}
          onSelect={setRange}
        />

        <RangeButton
          label="Next 30 Days"
          value="30"
          activeRange={range}
          onSelect={setRange}
        />

        <RangeButton
          label="Next 90 Days"
          value="90"
          activeRange={range}
          onSelect={setRange}
        />

        <RangeButton
          label="All Upcoming"
          value="all"
          activeRange={range}
          onSelect={setRange}
        />
      </div>

      {/* SECTION: Filtered Summary */}

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <CalendarStat
          label="Visible Interviews"
          value={filteredInterviews.length}
        />

        <CalendarStat
          label="Interview Days"
          value={interviewDates.length}
        />

        <CalendarStat
          label="Candidates Scheduled"
          value={
            new Set(
              filteredInterviews.map(
                (interview) => interview.candidate_id,
              ),
            ).size
          }
        />
      </section>

      {/* SECTION: Interview Schedule */}

      <PageSection
        title="Upcoming Schedule"
        description="Scheduled interviews grouped by date."
      >
        {interviewDates.length > 0 ? (
          <div className="space-y-6">
            {interviewDates.map((date) => (
              <div key={date}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {formatDateHeading(date)}
                </h3>

                <div className="space-y-3">
                  {groupedInterviews[date].map((interview) => {
                    const candidate = candidateMap.get(
                      interview.candidate_id,
                    );

                    return (
                      <Link
                        key={interview.id}
                        href={`/candidates/${interview.candidate_id}`}
                        className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-semibold text-slate-950">
                              {candidate?.name ?? "Unknown Candidate"}
                            </p>

                            <p className="text-sm text-slate-500">
                              {candidate?.role ?? "No role listed"}
                            </p>

                            <p className="mt-2 text-sm text-slate-700">
                              {formatInterviewTime(
                                interview.interview_time,
                              )}
                              {interview.timezone
                                ? ` · ${interview.timezone}`
                                : ""}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                              {interview.interview_type}
                            </span>

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                              {interview.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                          <p>
                            Interviewer:{" "}
                            {interview.interviewer ?? "Not assigned"}
                          </p>

                          <p>
                            Location:{" "}
                            {interview.meeting_location ??
                              "No meeting location"}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No interviews in this range."
            description="Try selecting a longer date range."
          />
        )}
      </PageSection>
    </>
  );
}

function RangeButton({
  label,
  value,
  activeRange,
  onSelect,
}: {
  label: string;
  value: RangeFilter;
  activeRange: RangeFilter;
  onSelect: (value: RangeFilter) => void;
}) {
  const active = activeRange === value;

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function CalendarStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function formatDateHeading(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatInterviewTime(time: string) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}