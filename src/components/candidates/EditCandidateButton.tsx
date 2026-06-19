"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Candidate } from "@/lib/candidates";
import { updateCandidate } from "@/lib/candidates";

type EditCandidateButtonProps = {
  candidate: Candidate;
};

export default function EditCandidateButton({
  candidate,
}: EditCandidateButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: candidate.name ?? "",
    role: candidate.role ?? "",
    email: candidate.email ?? "",
    phone: candidate.phone ?? "",
    location: candidate.location ?? "",
    status: candidate.status ?? "Qualified",
    source: candidate.source ?? "LinkedIn",
    recruiter: candidate.recruiter ?? "Michael Sullivan",
    experience: candidate.experience ?? "",
    salary: candidate.salary ?? "",
  });

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);

    await updateCandidate(candidate.id, formData);

    setIsSaving(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Edit Candidate
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* SECTION: Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Edit Candidate
                </h2>
                <p className="text-sm text-slate-500">
                  Update candidate profile details.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
              >
                Close
              </button>
            </div>

            {/* SECTION: Edit Candidate Form */}

            <form className="grid gap-4 p-6 md:grid-cols-2">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(value) => updateField("name", value)}
              />

              <Input
                label="Current Position"
                value={formData.role}
                onChange={(value) => updateField("role", value)}
              />

              <Input
                label="Email"
                value={formData.email}
                onChange={(value) => updateField("email", value)}
              />

              <Input
                label="Phone"
                value={formData.phone}
                onChange={(value) => updateField("phone", value)}
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(value) => updateField("location", value)}
              />

              <Input
                label="Target Salary"
                value={formData.salary}
                onChange={(value) => updateField("salary", value)}
              />

              <Select
                label="Source"
                value={formData.source}
                onChange={(value) => updateField("source", value)}
                options={["LinkedIn", "Indeed", "Referral", "ZipRecruiter", "Other"]}
              />

              <Select
                label="Recruiter"
                value={formData.recruiter}
                onChange={(value) => updateField("recruiter", value)}
                options={["Michael Sullivan", "Hans Denton"]}
              />

              <Select
                label="Status"
                value={formData.status}
                onChange={(value) => updateField("status", value)}
                options={[
                  "New Lead",
                  "Qualified",
                  "Submitted",
                  "Interview",
                  "Offer",
                  "Placed",
                ]}
              />

              <Input
                label="Years Experience"
                value={formData.experience}
                onChange={(value) => updateField("experience", value)}
              />
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
                disabled={isSaving}
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