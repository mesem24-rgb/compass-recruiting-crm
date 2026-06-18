type StatCardProps = {
  label: string;
  value: string;
  change: string;
};

export default function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-emerald-600">{change}</p>
    </div>
  );
}