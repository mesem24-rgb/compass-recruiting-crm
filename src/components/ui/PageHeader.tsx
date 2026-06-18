type PageHeaderProps = {
  title: string;
  description: string;
  actionLabel?: string;
};

export default function PageHeader({
  title,
  description,
  actionLabel,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>

      {actionLabel && (
        <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          {actionLabel}
        </button>
      )}
    </div>
  );
}