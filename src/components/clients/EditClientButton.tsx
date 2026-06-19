"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Client } from "@/lib/clients";
import { updateClient } from "@/lib/clients";

type EditClientButtonProps = {
  client: Client;
};

export default function EditClientButton({ client }: EditClientButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    company: client.company ?? "",
    contact: client.contact ?? "",
    email: client.email ?? "",
    phone: client.phone ?? "",
    industry: client.industry ?? "",
    location: client.location ?? "",
    revenue: client.revenue ?? "",
  });

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    await updateClient(client.id, formData);
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
        Edit Client
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* SECTION: Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Edit Client
                </h2>
                <p className="text-sm text-slate-500">
                  Update client account details.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
              >
                Close
              </button>
            </div>

            {/* SECTION: Edit Client Form */}

            <form className="grid gap-4 p-6 md:grid-cols-2">
              <Input
                label="Company Name"
                value={formData.company}
                onChange={(value) => updateField("company", value)}
              />

              <Input
                label="Primary Contact"
                value={formData.contact}
                onChange={(value) => updateField("contact", value)}
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
                label="Industry"
                value={formData.industry}
                onChange={(value) => updateField("industry", value)}
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(value) => updateField("location", value)}
              />

              <Input
                label="Revenue Generated"
                value={formData.revenue}
                onChange={(value) => updateField("revenue", value)}
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
                disabled={isSaving || !formData.company.trim()}
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
        placeholder={label}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
      />
    </div>
  );
}