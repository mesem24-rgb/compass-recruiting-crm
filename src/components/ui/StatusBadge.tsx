type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Open: "bg-emerald-50 text-emerald-700",
    Interviewing: "bg-blue-50 text-blue-700",
    Interview: "bg-blue-50 text-blue-700",
    Submitted: "bg-purple-50 text-purple-700",
    Qualified: "bg-amber-50 text-amber-700",
    High: "bg-red-50 text-red-700",
    Medium: "bg-orange-50 text-orange-700",
    Low: "bg-slate-100 text-slate-600",
    Placed: "bg-emerald-50 text-emerald-700",
    Offer: "bg-indigo-50 text-indigo-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}