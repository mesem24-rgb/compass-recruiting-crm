"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  KanbanSquare,
  BarChart3,
  Calendar,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Recruiter", href: "/recruiter", icon: UserCheck },
  { label: "Candidates", href: "/candidates", icon: Users },
  { label: "Clients", href: "/clients", icon: Building2 },
  { label: "Job Orders", href: "/job-orders", icon: BriefcaseBusiness },
  { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-slate-950 text-white xl:block">
      <div className="border-b border-slate-800 p-5">
        <div className="mb-4 rounded-xl bg-white px-4 py-3 shadow-sm">
          <Image
            src="/compass-logo.jpg"
            alt="Compass Group logo"
            width={150}
            height={90}
            className="mx-auto h-auto max-h-20 w-auto object-contain"
            priority
          />
        </div>

        <h1 className="text-lg font-bold leading-tight">
          Compass Group Recruiting
        </h1>

        <p className="mt-1 text-sm text-slate-400">Talent Acquisition CRM</p>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
