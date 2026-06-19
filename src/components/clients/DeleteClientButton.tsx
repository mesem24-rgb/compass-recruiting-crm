"use client";

import { useRouter } from "next/navigation";
import { deleteClient } from "@/lib/clients";

type DeleteClientButtonProps = {
  clientId: string;
};

export default function DeleteClientButton({
  clientId,
}: DeleteClientButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?",
    );

    if (!confirmed) return;

    await deleteClient(clientId);

    router.push("/clients");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
    >
      Delete Client
    </button>
  );
}