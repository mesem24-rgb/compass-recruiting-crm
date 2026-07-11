"use client";

import { useState } from "react";
import { getCandidateResumeUrl } from "@/lib/candidates";

type ViewResumeButtonProps = {
  resumePath: string | null;
};

export default function ViewResumeButton({
  resumePath,
}: ViewResumeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleViewResume() {
    if (!resumePath) return;

    try {
      setIsLoading(true);

      const signedUrl = await getCandidateResumeUrl(resumePath);

      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to open resume:", error);

      alert(
        error instanceof Error ? error.message : "Failed to open resume",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!resumePath) return null;

  return (
    <button
      type="button"
      onClick={handleViewResume}
      disabled={isLoading}
      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
    >
      {isLoading ? "Opening..." : "View Resume"}
    </button>
  );
}