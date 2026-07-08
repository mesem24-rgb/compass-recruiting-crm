import type { ReactNode } from "react";

/* SECTION: Action Bar Types */

type ActionBarProps = {
  title: string;
  children: ReactNode;
};

/* SECTION: Action Bar Component */

export default function ActionBar({ title, children }: ActionBarProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-950">{title}</h2>

      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}