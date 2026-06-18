"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { candidates } from "@/lib/data";

export default function CandidateTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [recruiter, setRecruiter] = useState("All Recruiters");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.role.toLowerCase().includes(search.toLowerCase()) ||
        candidate.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All Statuses" || candidate.status === status;

      const matchesRecruiter =
        recruiter === "All Recruiters" || candidate.recruiter === recruiter;

      return matchesSearch && matchesStatus && matchesRecruiter;
    });
  }, [search, status, recruiter]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search candidates..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 outline-none focus:border-slate-400"
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className={`rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 ${
            status === "All Statuses" ? "text-slate-500" : "text-slate-700"
          }`}
        >
          <option>All Statuses</option>
          <option>Qualified</option>
          <option>Submitted</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Placed</option>
        </select>

        <select
          value={recruiter}
          onChange={(event) => setRecruiter(event.target.value)}
          className={`rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 ${
            recruiter === "All Recruiters" ? "text-slate-500" : "text-slate-700"
          }`}
        >
          <option>All Recruiters</option>
          <option>Michael Sullivan</option>
          <option>Hans Denton</option>
        </select>
      </div>

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
                <p className="text-sm text-slate-500">{candidate.role}</p>
              </div>

              <StatusBadge status={candidate.status} />
            </div>

            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>Recruiter: {candidate.recruiter}</p>
              <p>Location: {candidate.location}</p>
              <p>Last Contact: {candidate.lastContact}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Recruiter</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Last Contact</th>
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
                <td className="px-4 py-3 text-slate-600">{candidate.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={candidate.status} />
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {candidate.recruiter}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {candidate.location}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {candidate.lastContact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No candidates found.
        </div>
      )}
    </>
  );
}
