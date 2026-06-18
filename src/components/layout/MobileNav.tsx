"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calendar,
  KanbanSquare,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Candidates", href: "/candidates", icon: Users },
  { label: "Clients", href: "/clients", icon: Building2 },
  { label: "Job Orders", href: "/job-orders", icon: BriefcaseBusiness },
  { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50 xl:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
        aria-label="Toggle navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-[9999] w-72 rounded-xl border border-slate-800 bg-slate-950 p-3 text-white shadow-2xl">
          <div className="border-b border-slate-800 px-3 pb-3">
            <h2 className="font-bold">Compass CRM</h2>
            <p className="text-xs text-slate-400">Recruiting Platform</p>
          </div>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}