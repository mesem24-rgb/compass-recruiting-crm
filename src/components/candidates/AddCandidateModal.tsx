"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type AddCandidateModalProps = {
  open: boolean;
  onClose: () => void;
};

type CandidateFormData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  salary: string;
  source: string;
  recruiter: string;
  status: string;
  experience: string;
  notes: string;
};

const initialFormData: CandidateFormData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  salary: "",
  source: "LinkedIn",
  recruiter: "Michael Sullivan",
  status: "Qualified",
  experience: "",
  notes: "",
};

export default function AddCandidateModal({
  open,
  onClose,
}: AddCandidateModalProps) {
  const [formData, setFormData] = useState<CandidateFormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!open) return null;

  function updateField(field: keyof CandidateFormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSaveCandidate() {
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Candidate name is required.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.from("candidates").insert({
      name: formData.name,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      salary: formData.salary,
      source: formData.source,
      recruiter: formData.recruiter,
      status: formData.status,
      experience: formData.experience,
    });

    setIsSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setFormData(initialFormData);
    onClose();

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* SECTION: Modal Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Add New Candidate
            </h2>
            <p className="text-sm text-slate-500">
              Create a new candidate profile.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
          >
            Close
          </button>
        </div>

        {/* SECTION: Candidate Form */}

        <form className="grid gap-4 p-6 md:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="Amanda Pierce"
            value={formData.name}
            onChange={(value) => updateField("name", value)}
          />

          <Input
            label="Current Position"
            placeholder="Operations Manager"
            value={formData.role}
            onChange={(value) => updateField("role", value)}
          />

          <Input
            label="Email"
            placeholder="candidate@email.com"
            value={formData.email}
            onChange={(value) => updateField("email", value)}
          />

          <Input
            label="Phone"
            placeholder="(555) 555-5555"
            value={formData.phone}
            onChange={(value) => updateField("phone", value)}
          />

          <Input
            label="Location"
            placeholder="Dallas, TX"
            value={formData.location}
            onChange={(value) => updateField("location", value)}
          />

          <Input
            label="Target Salary"
            placeholder="$95,000"
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
            placeholder="12 years"
            value={formData.experience}
            onChange={(value) => updateField("experience", value)}
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Add initial candidate notes..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
            />
          </div>

          {errorMessage && (
            <div className="md:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}
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
            onClick={handleSaveCandidate}
            disabled={isSaving}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Candidate"}
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
          <option key={option} value={option} className="text-slate-700">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}