"use client";

import MobileNav from "./MobileNav";
import NotificationBell from "@/components/layout/NotificationBell";
import type { Notification } from "@/lib/notifications";

type TopbarProps = {
  notifications: Notification[];
};

export default function Topbar({
  notifications,
}: TopbarProps): React.ReactElement {
  

  return (
    <header className="relative z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileNav />

        <div>
          <p className="text-xs text-slate-500 md:text-sm">
            Compass Group Recruiting
          </p>
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">
            Talent Acquisition CRM
          </h2>
        </div>
      </div>

      
      <div className="flex items-center gap-3">
        <NotificationBell notifications={notifications} />

        {/* existing profile/menu controls */}
      </div>
    </header>
  );
}
