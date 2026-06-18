"use client";

type AddCandidateModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddCandidateModal({
  open,
  onClose,
}: AddCandidateModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
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

        <form className="grid gap-4 p-6 md:grid-cols-2">
          <Input label="Full Name" placeholder="Your Name" />
          <Input label="Current Position" placeholder="Operations Manager" />
          <Input label="Email" placeholder="candidate@email.com" />
          <Input label="Phone" placeholder="(555) 555-5555" />
          <Input label="Location" placeholder="City, State" />
          <Input label="Target Salary" placeholder="$95,000" />

          <Select
            label="Source"
            options={[
              "LinkedIn",
              "Indeed",
              "Referral",
              "ZipRecruiter",
              "Other",
            ]}
          />

          <Select
            label="Recruiter"
            options={["Michael Sullivan", "Hans Denton"]}
          />

          <Select
            label="Status"
            options={[
              "New Lead",
              "Qualified",
              "Submitted",
              "Interview",
              "Offer",
              "Placed",
            ]}
          />

          <Input label="Years Experience" placeholder="12 years" />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              rows={4}
              placeholder="Add initial candidate notes..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
            />
          </div>
        </form>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save Candidate
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400">
        {options.map((option) => (
          <option key={option} value={option} className="text-slate-700">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
