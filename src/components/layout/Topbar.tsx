import MobileNav from "./MobileNav";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileNav />

        <div>
          <p className="text-xs text-slate-500 md:text-sm">
            Compass Group Recruiting
          </p>
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">
            Recruiting CRM Dashboard
          </h2>
        </div>
      </div>

      <button className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 sm:block">
        Add Candidate
      </button>
    </header>
  );
}