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
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-slate-200 p-2 text-slate-700"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/50">
          <div className="h-full w-72 bg-slate-950 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <h1 className="text-xl font-bold">Compass CRM</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Recruiting Platform
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-800 p-2"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}