"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const loadingSteps = [
  "Initializing Workspace",
  "Loading Candidates",
  "Loading Clients",
  "Loading Job Orders",
  "Preparing Pipeline",
];

export default function LandingPage() {
  const router = useRouter();
  function enterDemo() {
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl">
        {/* SECTION: Compass Logo */}

        <div className="mx-auto mb-6 w-fit rounded-3xl bg-white p-4 shadow-xl">
          <Image
            src="/compass-logo.jpg"
            alt="Compass Group Recruiting"
            width={200}
            height={120}
            className="h-auto w-auto"
            priority
          />
        </div>

        {/* SECTION: Title */}

        <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
          Compass Group
        </p>

        <h1 className="mt-3 text-3xl font-bold">Recruiting CRM Platform</h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Candidate management, client tracking, job orders, submissions, and
          drag-and-drop hiring pipeline.
        </p>

        {/* SECTION: Builder Logo */}

        <div className="mt-8 border-t border-slate-800 pt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">
            Powered by
          </p>

          <div className="mx-auto flex h-14 w-14 items-center justify-center text-lg font-bold text-slate-950 shadow-lg">
            <Image
              src="/michael-logo.jpg"
              alt="MS"
              width={56}
              height={56}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Built by Michael Sullivan
          </p>
        </div>

        {/* SECTION: Demo Loading State */}

        <button
          onClick={enterDemo}
          className="mt-8 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Enter Demo CRM
        </button>
      </section>
    </main>
  );
}
