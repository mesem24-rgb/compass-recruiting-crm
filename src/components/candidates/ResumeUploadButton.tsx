"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadCandidateResume } from "@/lib/candidates";

type ResumeUploadButtonProps = {
  candidateId: string;
  currentFilename?: string | null;
};

const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export default function ResumeUploadButton({
  candidateId,
  currentFilename,
}: ResumeUploadButtonProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setErrorMessage("");

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Upload a PDF, DOC, or DOCX resume.");
      event.target.value = "";
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMessage("Resume files must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);

      await uploadCandidateResume({
        candidateId,
        file,
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to upload resume:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "Failed to upload resume.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading
          ? "Uploading..."
          : currentFilename
            ? "Replace Resume"
            : "Upload Resume"}
      </button>

      {currentFilename && (
        <p className="mt-2 max-w-xs truncate text-xs text-slate-500">
          Current file: {currentFilename}
        </p>
      )}

      {errorMessage && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}