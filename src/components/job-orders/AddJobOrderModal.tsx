"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJobOrder } from "@/lib/job-orders";

type AddJobOrderModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialFormData = {
  title: "",
  client: "",
  status: "Open",
  priority: "Medium",
  location: "",
  salary_range: "",
  assigned_recruiter: "Michael Sullivan",
  description: "",
  priority_skills: "",
  secondary_skills: "",
  keywords: "",
  preferred_location: "",
  replacement_priority: false,
  zip_code: "",
};

export default function AddJobOrderModal({
  open,
  onClose,
}: AddJobOrderModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  function updateField(field: keyof typeof formData, value: string | boolean) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    if (!formData.title.trim()) return;

    setIsSaving(true);

    await createJobOrder({
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
    });
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* SECTION: Modal Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Add New Job Order
            </h2>
            <p className="text-sm text-slate-500">
              Create a new recruiting assignment.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
          >
            Close
          </button>
        </div>

        {/* SECTION: Job Order Form */}

        <form className="grid gap-4 p-6 md:grid-cols-2">
          <Input
            label="Job Title"
            placeholder="Regional Operations Manager"
            value={formData.title}
            onChange={(value) => updateField("title", value)}
          />

          <Input
            label="Client"
            placeholder="Premier Hospitality Group"
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
            placeholder="Dallas, TX"
            value={formData.location}
            onChange={(value) => updateField("location", value)}
          />

          <Input
            label="ZIP Code"
            placeholder="39503"
            value={formData.zip_code}
            onChange={(value) => updateField("zip_code", value)}
          />

          <Input
            label="Salary Range"
            placeholder="$110,000 - $130,000"
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
            placeholder="Multi-unit leadership, P&L, operations"
            value={formData.priority_skills}
            onChange={(value) => updateField("priority_skills", value)}
          />

          <Input
            label="Secondary Skills"
            placeholder="Hiring, training, inventory"
            value={formData.secondary_skills}
            onChange={(value) => updateField("secondary_skills", value)}
          />

          <Input
            label="Keywords"
            placeholder="Regional Manager, retail, hospitality"
            value={formData.keywords}
            onChange={(value) => updateField("keywords", value)}
          />

          <Input
            label="Preferred Location"
            placeholder="Dallas, TX"
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
              placeholder="Add job description, client expectations, and key requirements..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
            />
          </div>
        </form>

        {/* SECTION: Modal Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
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
            {isSaving ? "Saving..." : "Save Job Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
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
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
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
