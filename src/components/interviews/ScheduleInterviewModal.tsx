"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInterview } from "@/lib/interviews";
import { CalendarDays, X } from "lucide-react";

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
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      {/* SECTION: Modal Header */}

      <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <CalendarDays className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Schedule Interview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new interview for this candidate.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          aria-label="Close interview modal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* SECTION: Interview Form */}

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <FieldLabel>Interview Type</FieldLabel>

          <select
            value={form.interview_type}
            onChange={(event) =>
              updateField("interview_type", event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          >
            <option>Video</option>
            <option>Phone</option>
            <option>In Person</option>
          </select>
        </div>

        <div>
          <FieldLabel>Interview Date</FieldLabel>

          <input
            type="date"
            value={form.interview_date}
            onChange={(event) =>
              updateField("interview_date", event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <FieldLabel>Interview Time</FieldLabel>

          <input
            type="time"
            value={form.interview_time}
            onChange={(event) =>
              updateField("interview_time", event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <FieldLabel>Time Zone</FieldLabel>

          <select
            value={form.timezone}
            onChange={(event) =>
              updateField("timezone", event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          >
            <option value="America/Chicago">Central Time</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>

        <div>
          <FieldLabel>Interviewer</FieldLabel>

          <input
            value={form.interviewer}
            onChange={(event) =>
              updateField("interviewer", event.target.value)
            }
            placeholder="Hiring manager or interviewer"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400"
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel>Meeting Link or Location</FieldLabel>

          <input
            value={form.meeting_location}
            onChange={(event) =>
              updateField("meeting_location", event.target.value)
            }
            placeholder="Teams, Zoom, Google Meet, phone number, or address"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400"
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel>Notes</FieldLabel>

          <textarea
            rows={3}
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Add interview instructions, preparation notes, or follow-up details..."
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-slate-400"
          />
        </div>
      </div>

      {/* SECTION: Modal Footer */}

      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={
            saving || !form.interview_date || !form.interview_time
          }
          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Scheduling..." : "Schedule Interview"}
        </button>
      </div>
    </div>
  </div>
);
}


function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

