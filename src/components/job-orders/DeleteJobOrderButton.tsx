"use client";

import { useRouter } from "next/navigation";
import { deleteJobOrder } from "@/lib/job-orders";

type DeleteJobOrderButtonProps = {
  jobOrderId: string;
};

export default function DeleteJobOrderButton({
  jobOrderId,
}: DeleteJobOrderButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job order?",
    );

    if (!confirmed) return;

    await deleteJobOrder(jobOrderId);

    router.push("/job-orders");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      Delete Job Order
    </button>
  );
}