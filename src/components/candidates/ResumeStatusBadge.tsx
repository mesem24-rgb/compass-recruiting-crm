type Props = {
  status: string | null;
};

export default function ResumeStatusBadge({ status }: Props) {
  const styles = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-200",

    processing:
      "bg-blue-50 text-blue-700 border-blue-200",

    parsed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    failed:
      "bg-red-50 text-red-700 border-red-200",
  };

  const labels = {
    pending: "Pending",
    processing: "Processing",
    parsed: "Parsed",
    failed: "Failed",
  };

  const key =
    status && status in styles
      ? (status as keyof typeof styles)
      : "pending";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[key]}`}
    >
      {labels[key]}
    </span>
  );
}