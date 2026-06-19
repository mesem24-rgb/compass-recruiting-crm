"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/clients";

type AddClientModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialFormData = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  industry: "",
  location: "",
  revenue: "",
};

export default function AddClientModal({ open, onClose }: AddClientModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    if (!formData.company.trim()) return;

    setIsSaving(true);

    await createClient(formData);

    setFormData(initialFormData);
    setIsSaving(false);
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* SECTION: Modal Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Add New Client
            </h2>
            <p className="text-sm text-slate-500">
              Create a new client account.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
          >
            Close
          </button>
        </div>

        {/* SECTION: Client Form */}

        <form className="grid gap-4 p-6 md:grid-cols-2">
          <Input
            label="Company Name"
            placeholder="Premier Hospitality Group"
            value={formData.company}
            onChange={(value) => updateField("company", value)}
          />

          <Input
            label="Primary Contact"
            placeholder="Sarah Mitchell"
            value={formData.contact}
            onChange={(value) => updateField("contact", value)}
          />

          <Input
            label="Email"
            placeholder="contact@company.com"
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
            label="Industry"
            placeholder="Hospitality"
            value={formData.industry}
            onChange={(value) => updateField("industry", value)}
          />

          <Input
            label="Location"
            placeholder="Dallas, TX"
            value={formData.location}
            onChange={(value) => updateField("location", value)}
          />

          <Input
            label="Revenue Generated"
            placeholder="$185,000"
            value={formData.revenue}
            onChange={(value) => updateField("revenue", value)}
          />
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
            disabled={isSaving || !formData.company.trim()}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Client"}
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