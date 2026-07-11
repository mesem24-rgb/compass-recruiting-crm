"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import type { Notification } from "@/lib/notifications";
import Link from "next/link";

type NotificationBellProps = {
  notifications: Notification[];
};

export default function NotificationBell({
  notifications,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
        aria-label="Open notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-[100] mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* SECTION: Notification Header */}

          <div className="border-b border-slate-200 px-4 py-3">
            <p className="font-semibold text-slate-950">Notifications</p>
            <p className="text-xs text-slate-500">Recent recruiting activity</p>
          </div>

          {/* SECTION: Notification List */}

          <div className="max-h-96 overflow-y-auto p-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link
                  href={notification.href ?? "/recruiter"}
                  key={notification.id}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg p-3 hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <NotificationDot type={notification.type} />

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {notification.description}
                      </p>

                      <p className="mt-2 text-[11px] text-slate-400">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">
                No notifications.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationDot({ type }: { type: "warning" | "success" | "info" }) {
  const classes = {
    warning: "bg-amber-500",
    success: "bg-emerald-500",
    info: "bg-blue-500",
  };

  return (
    <span
      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${classes[type]}`}
    />
  );
}
