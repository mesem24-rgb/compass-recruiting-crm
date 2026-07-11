import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import type { Notification } from "@/lib/notifications";

type NotificationListProps = {
  notifications: Notification[];
};

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No notifications."
        description="Important recruiting activity will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Link
          href={notification.href ?? "/recruiter"}
          key={notification.id}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100"
        >
          <NotificationIndicator type={notification.type} />

          <div className="min-w-0">
            <p className="font-medium text-slate-950">
              {notification.title}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {notification.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function NotificationIndicator({
  type,
}: {
  type: "warning" | "success" | "info";
}) {
  const classes = {
    warning: "bg-amber-500",
    success: "bg-emerald-500",
    info: "bg-blue-500",
  };

  return (
    <span
      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${classes[type]}`}
    />
  );
}