"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateInterview } from "@/lib/interviews";

type InterviewStatusActionsProps = {
  interviewId: string;
  currentStatus: string;
};

export default function InterviewStatusActions({
  interviewId,
  currentStatus,
}: InterviewStatusActionsProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleStatusChange(status: string) {
    try {
      setIsSaving(true);

      await updateInterview(interviewId, {
        status,
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to update interview:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update interview status.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {currentStatus !== "Completed" && (
        <button
          type="button"
          onClick={() => handleStatusChange("Completed")}
          disabled={isSaving}
          className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
        >
          Mark Completed
        </button>
      )}

      {currentStatus !== "Cancelled" && (
        <button
          type="button"
          onClick={() => handleStatusChange("Cancelled")}
          disabled={isSaving}
          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          Cancel Interview
        </button>
      )}
    </div>
  );
}