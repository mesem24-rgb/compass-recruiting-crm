"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Candidate } from "@/lib/candidates";

type CandidateTableProps = {
  candidates: Candidate[];
};

export default function CandidateTable({ candidates }: CandidateTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [recruiter, setRecruiter] = useState("All Recruiters");
  const [skillSearch, setSkillSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [relocationOnly, setRelocationOnly] = useState(false);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const role = candidate.role ?? "";
      const location = candidate.location ?? "";
      const candidateStatus = candidate.status ?? "Qualified";
      const candidateRecruiter = candidate.recruiter ?? "Unassigned";
      const prioritySkills = candidate.priority_skills ?? [];
      const secondarySkills = candidate.secondary_skills ?? [];
      const keywords = candidate.keywords ?? [];

      const matchesSkills =
        !skillSearch ||
        [...prioritySkills, ...secondarySkills, ...keywords]
          .join(" ")
          .toLowerCase()
          .includes(skillSearch.toLowerCase());

      const matchesLocation =
        !locationSearch ||
        candidate.location
          ?.toLowerCase()
          .includes(locationSearch.toLowerCase()) ||
        candidate.preferred_location
          ?.toLowerCase()
          .includes(locationSearch.toLowerCase());

      const matchesRelocation =
        !relocationOnly || candidate.willing_to_relocate === true;

      const matchesSearch =
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        role.toLowerCase().includes(search.toLowerCase()) ||
        location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All Statuses" || candidateStatus === status;

      const matchesRecruiter =
        recruiter === "All Recruiters" || candidateRecruiter === recruiter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRecruiter &&
        matchesSkills &&
        matchesLocation &&
        matchesRelocation
      );
    });
  }, [
    candidates,
    search,
    status,
    recruiter,
    skillSearch,
    locationSearch,
    relocationOnly,
  ]);

  return (
    <>
      {/* SECTION: Candidate Filters */}

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search candidates..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
        />

        <input
          value={skillSearch}
          onChange={(event) => setSkillSearch(event.target.value)}
          placeholder="Search skills or keywords..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
        />

        <input
          value={locationSearch}
          onChange={(event) => setLocationSearch(event.target.value)}
          placeholder="Search location..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
        />
        <label className="flex min-w-[200px] items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={relocationOnly}
            onChange={(event) => setRelocationOnly(event.target.checked)}
          />
          <span>Willing to relocate</span>
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
        >
          <option>All Statuses</option>
          <option>New Lead</option>
          <option>Qualified</option>
          <option>Submitted</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Placed</option>
        </select>

        <select
          value={recruiter}
          onChange={(event) => setRecruiter(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
        >
          <option>All Recruiters</option>
          <option>Michael Sullivan</option>
          <option>Hans Denton</option>
          <option>Unassigned</option>
        </select>
      </div>

      {/* SECTION: Mobile Candidate Cards */}

      <div className="space-y-3 xl:hidden">
        {filteredCandidates.map((candidate) => (
          <Link
            href={`/candidates/${candidate.id}`}
            key={candidate.id}
            className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{candidate.name}</p>
                <p className="text-sm text-slate-500">
                  {candidate.role ?? "No role listed"}
                </p>
              </div>

              <StatusBadge status={candidate.status ?? "Qualified"} />
            </div>

            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>Recruiter: {candidate.recruiter ?? "Unassigned"}</p>
              <p>Location: {candidate.location ?? "No location listed"}</p>
              <p>
                Created: {new Date(candidate.created_at).toLocaleDateString()}
              </p>
            </div>
            {/* SECTION: Candidate Skill Badges */}

            <SkillBadges candidate={candidate} />
          </Link>
        ))}
      </div>

      {/* SECTION: Desktop Candidate Table */}

      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Recruiter</th>
              <th className="px-4 py-3">Location</th>

              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  <Link
                    href={`/candidates/${candidate.id}`}
                    className="hover:underline"
                  >
                    {candidate.name}
                  </Link>
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {candidate.role ?? "No role listed"}
                </td>

                <td className="px-4 py-3">
                  <SkillBadges candidate={candidate} compact />
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={candidate.status ?? "Qualified"} />
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {candidate.recruiter ?? "Unassigned"}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {candidate.location ?? "No location listed"}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {new Date(candidate.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION: Empty State */}

      {filteredCandidates.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No candidates match your current filters.
        </div>
      )}
    </>
  );
}

function SkillBadges({
  candidate,
  compact = false,
}: {
  candidate: Candidate;
  compact?: boolean;
}) {
  const skills = [
    ...(candidate.priority_skills ?? []),
    ...(candidate.secondary_skills ?? []),
  ].slice(0, compact ? 3 : 5);

  if (skills.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
