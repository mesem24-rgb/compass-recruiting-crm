"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { JobOrder } from "@/lib/job-orders";
import { updateJobOrder } from "@/lib/job-orders";

type EditJobOrderButtonProps = {
  jobOrder: JobOrder;
};

export default function EditJobOrderButton({
  jobOrder,
}: EditJobOrderButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: jobOrder.title ?? "",
    client: jobOrder.client ?? "",
    status: jobOrder.status ?? "Open",
    priority: jobOrder.priority ?? "Medium",
    location: jobOrder.location ?? "",
    zip_code: jobOrder.zip_code ?? "",
    salary_range: jobOrder.salary_range ?? "",
    assigned_recruiter: jobOrder.assigned_recruiter ?? "Michael Sullivan",
    description: jobOrder.description ?? "",
    priority_skills: jobOrder.priority_skills?.join(", ") ?? "",
    secondary_skills: jobOrder.secondary_skills?.join(", ") ?? "",
    keywords: jobOrder.keywords?.join(", ") ?? "",
    preferred_location: jobOrder.preferred_location ?? "",
    replacement_priority: jobOrder.replacement_priority ?? false,
  });

  function updateField(field: keyof typeof formData, value: string | boolean) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    try {
      setIsSaving(true);

      await updateJobOrder(jobOrder.id, {
        ...formData,
        priority_skills: formData.priority_skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        secondary_skills: formData.secondary_skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        keywords: formData.keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
        replacement_priority: Boolean(formData.replacement_priority),
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update job order:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update job order",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Edit Job Order
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* SECTION: Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Edit Job Order
                </h2>
                <p className="text-sm text-slate-500">
                  Update job order details.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
              >
                Close
              </button>
            </div>

            {/* SECTION: Edit Job Order Form */}

            <form className="grid gap-4 p-6 md:grid-cols-2">
              <Input
                label="Job Title"
                value={formData.title}
                onChange={(value) => updateField("title", value)}
              />

              <Input
                label="Client"
                value={formData.client}
                onChange={(value) => updateField("client", value)}
              />

              <Select
                label="Status"
                value={formData.status}
                onChange={(value) => updateField("status", value)}
                options={["Open", "Interviewing", "On Hold", "Closed"]}
              />

              <Select
                label="Priority"
                value={formData.priority}
                onChange={(value) => updateField("priority", value)}
                options={["Low", "Medium", "High"]}
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(value) => updateField("location", value)}
              />

              <Input
                label="ZIP Code"
                value={formData.zip_code}
                onChange={(value) => updateField("zip_code", value)}
              />

              <Input
                label="Salary Range"
                value={formData.salary_range}
                onChange={(value) => updateField("salary_range", value)}
              />

              <Select
                label="Assigned Recruiter"
                value={formData.assigned_recruiter}
                onChange={(value) => updateField("assigned_recruiter", value)}
                options={["Michael Sullivan", "Hans Denton"]}
              />

              <Input
                label="Priority Skills"
                value={formData.priority_skills}
                onChange={(value) => updateField("priority_skills", value)}
              />

              <Input
                label="Secondary Skills"
                value={formData.secondary_skills}
                onChange={(value) => updateField("secondary_skills", value)}
              />

              <Input
                label="Keywords"
                value={formData.keywords}
                onChange={(value) => updateField("keywords", value)}
              />

              <Input
                label="Preferred Location"
                value={formData.preferred_location}
                onChange={(value) => updateField("preferred_location", value)}
              />

              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(formData.replacement_priority)}
                  onChange={(event) =>
                    updateField("replacement_priority", event.target.checked)
                  }
                />
                Replacement priority
              </label>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
                />
              </div>
            </form>

            {/* SECTION: Modal Footer */}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                disabled={isSaving}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving || !formData.title.trim()}
                className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
