import type { ReactNode } from "react";

/* SECTION: Page Section Types */

type PageSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

/* SECTION: Page Section Component */

export default function PageSection({
  title,
  description,
  action,
  children,
}: PageSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}