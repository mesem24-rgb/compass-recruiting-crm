import type { ReactNode } from "react";

/* SECTION: Empty State Types */

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

/* SECTION: Empty State Component */

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <p className="text-sm font-medium text-slate-700">{title}</p>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}