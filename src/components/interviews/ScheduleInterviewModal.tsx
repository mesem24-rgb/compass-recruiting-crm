"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInterview } from "@/lib/interviews";

type Props = {
  open: boolean;
  onClose: () => void;
  candidateId: string;
};

export default function ScheduleInterviewModal({
  open,
  onClose,
  candidateId,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    interview_type: "Video",
    interview_date: "",
    interview_time: "",
    timezone: "America/Chicago",
    interviewer: "",
    meeting_location: "",
    notes: "",
  });

  if (!open) return null;

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!form.interview_date || !form.interview_time) {
      alert("Interview date and time are required.");
      return;
    }

    try {
      setSaving(true);

      await createInterview({
        candidate_id: candidateId,
        ...form,
      });

      setForm({
        interview_type: "Video",
        interview_date: "",
        interview_time: "",
        timezone: "America/Chicago",
        interviewer: "",
        meeting_location: "",
        notes: "",
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to schedule interview:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to schedule interview.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Schedule Interview</h2>

        <div className="mt-6 space-y-4">
          {/* Interview Type */}

          <select
            value={form.interview_type}
            onChange={(e) => updateField("interview_type", e.target.value)}
            className="w-full rounded-lg border p-2"
          >
            <option>Video</option>
            <option>Phone</option>
            <option>In Person</option>
          </select>

          {/* Date */}

          <input
            type="date"
            value={form.interview_date}
            onChange={(e) => updateField("interview_date", e.target.value)}
            className="w-full rounded-lg border p-2"
          />

          {/* Time */}

          <input
            type="time"
            value={form.interview_time}
            onChange={(e) => updateField("interview_time", e.target.value)}
            className="w-full rounded-lg border p-2"
          />

          {/* Interviewer */}

          <input
            placeholder="Interviewer"
            value={form.interviewer}
            onChange={(e) => updateField("interviewer", e.target.value)}
            className="w-full rounded-lg border p-2"
          />

          {/* Meeting */}

          <input
            placeholder="Meeting link or location"
            value={form.meeting_location}
            onChange={(e) => updateField("meeting_location", e.target.value)}
            className="w-full rounded-lg border p-2"
          />

          {/* Notes */}

          <textarea
            rows={4}
            placeholder="Notes..."
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !form.interview_date || !form.interview_time}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Scheduling..." : "Schedule Interview"}
          </button>
        </div>
      </div>
    </div>
  );
}
