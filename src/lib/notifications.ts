import type { Candidate } from "@/lib/candidates";
import type { JobOrder } from "@/lib/job-orders";
import { getAssignmentLockStatus } from "@/lib/job-orders";
import type { Interview } from "@/lib/interviews";

/* SECTION: Notification Type */

export type Notification = {
  id: string;
  title: string;
  description: string;
  type: "warning" | "success" | "info";
  created_at: string;
  href?: string;
};

/* SECTION: Build Recruiter Notifications */

export function buildRecruiterNotifications({
  jobOrders,
  candidates,
  interviews = [],
}: {
  jobOrders: JobOrder[];
  candidates: Candidate[];
  interviews?: Interview[];
}): Notification[] {
  const notifications: Notification[] = [];

  jobOrders.forEach((job) => {
    const lockStatus = getAssignmentLockStatus(job);

    if (
      lockStatus.isLocked &&
      lockStatus.daysRemaining !== null &&
      lockStatus.daysRemaining <= 7
    ) {
      notifications.push({
        id: `lock-${job.id}`,
        title: "Assignment Expiring",
        description: `${job.title} opens to other recruiters in ${
          lockStatus.daysRemaining === 0
            ? "less than one day"
            : `${lockStatus.daysRemaining} day${
                lockStatus.daysRemaining === 1 ? "" : "s"
              }`
        }.`,
        type: "warning",
        created_at: new Date().toISOString(),
        href: `/job-orders/${job.id}`,
      });
    }

    if (job.replacement_priority) {
      notifications.push({
        id: `replacement-${job.id}`,
        title: "Replacement Priority",
        description: `${job.title} is marked as a high-priority replacement role.`,
        type: "warning",
        created_at: job.created_at,
        href: `/job-orders/${job.id}`,
      });
    }
  });

  candidates
    .filter((candidate) => candidate.status === "Interview")
    .slice(0, 5)
    .forEach((candidate) => {
      notifications.push({
        id: `interview-${candidate.id}`,
        title: "Candidate Interviewing",
        description: `${candidate.name} is currently in the interview stage.`,
        type: "info",
        created_at: candidate.created_at,
        href: `/candidates/${candidate.id}`,
      });
    });

  candidates
    .filter((candidate) => candidate.status === "Placed")
    .slice(0, 5)
    .forEach((candidate) => {
      notifications.push({
        id: `placed-${candidate.id}`,
        title: "Candidate Placed",
        description: `${candidate.name} has reached the placed stage.`,
        type: "success",
        created_at: candidate.created_at,
        href: `/candidates/${candidate.id}`,
      });
    });

  /* SECTION: Interview Notifications */

  interviews
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
    .slice(0, 5)
    .forEach((interview) => {
      const candidate = candidates.find(
        (candidate) => candidate.id === interview.candidate_id,
      );

      notifications.push({
        id: `interview-scheduled-${interview.id}`,
        title: "Upcoming Interview",
        description: candidate
          ? `${candidate.name} has a ${interview.interview_type.toLowerCase()} interview scheduled.`
          : `A ${interview.interview_type.toLowerCase()} interview is scheduled.`,
        type: "info",
        created_at: interview.created_at,
        href: `/candidates/${interview.candidate_id}`,
      });
    });

  return notifications.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
