"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Candidate } from "@/lib/candidates";
import { updateCandidateStatus } from "@/lib/candidates";

type PipelineBoardProps = {
  candidates: Candidate[];
};

const stages = [
  "New Lead",
  "Qualified",
  "Submitted",
  "Interview",
  "Offer",
  "Placed",
];

export default function PipelineBoard({ candidates }: PipelineBoardProps) {
  const [localCandidates, setLocalCandidates] = useState(candidates);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  const totalCandidates = localCandidates.length;
  const interviews = localCandidates.filter(
    (candidate) => candidate.status === "Interview",
  ).length;
  const offers = localCandidates.filter(
    (candidate) => candidate.status === "Offer",
  ).length;
  const placements = localCandidates.filter(
    (candidate) => candidate.status === "Placed",
  ).length;

  const pipelineSummary = [
    { label: "Total Candidates", value: String(totalCandidates) },
    { label: "In Interviews", value: String(interviews) },
    { label: "Offers Pending", value: String(offers) },
    { label: "Placements", value: String(placements) },
  ];

  function handleDragStart(event: DragStartEvent) {
    const candidate = localCandidates.find(
      (item) => item.id === String(event.active.id),
    );

    setActiveCandidate(candidate ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const candidateId = String(event.active.id);
    const newStatus = event.over?.id ? String(event.over.id) : null;

    setActiveCandidate(null);

    if (!newStatus) return;

    const candidate = localCandidates.find((item) => item.id === candidateId);

    if (!candidate) return;

    const currentStatus = candidate.status ?? "Qualified";

    if (currentStatus === newStatus) return;

    setLocalCandidates((current) =>
      current.map((item) =>
        item.id === candidateId ? { ...item, status: newStatus } : item,
      ),
    );

    try {
      await updateCandidateStatus(candidateId, newStatus);
    } catch {
      setLocalCandidates((current) =>
        current.map((item) =>
          item.id === candidateId ? { ...item, status: currentStatus } : item,
        ),
      );
    }
  }

  return (
    <>
      {/* SECTION: Pipeline Summary */}

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pipelineSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* SECTION: Pipeline Drag And Drop Board */}

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <section className="overflow-x-auto pb-4">
          <div className="grid min-w-[1100px] gap-4 xl:grid-cols-6">
            {stages.map((stage) => {
              const stageCandidates = localCandidates.filter(
                (candidate) => (candidate.status ?? "Qualified") === stage,
              );

              return (
                <PipelineColumn
                  key={stage}
                  stage={stage}
                  candidates={stageCandidates}
                />
              );
            })}
          </div>
        </section>

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard candidate={activeCandidate} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function PipelineColumn({
  stage,
  candidates,
}: {
  stage: string;
  candidates: Candidate[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[520px] rounded-xl border p-4 transition ${
        isOver
          ? "border-slate-400 bg-slate-200"
          : "border-slate-200 bg-slate-100"
      }`}
    >
      {/* SECTION: Pipeline Column Header */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">{stage}</h2>

        <span className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
          {candidates.length}
        </span>
      </div>

      {/* SECTION: Pipeline Column Cards */}

      <div className="space-y-3">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-4 text-center text-sm text-slate-400">
            Drop candidates here
          </div>
        )}
      </div>
    </div>
  );
}

function CandidateCard({
  candidate,
  isOverlay = false,
}: {
  candidate: Candidate;
  isOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: candidate.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition ${
        isDragging ? "opacity-40" : ""
      } ${isOverlay ? "w-72 shadow-xl" : ""}`}
    >
      <Link href={`/candidates/${candidate.id}`} className="block">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-slate-950">{candidate.name}</p>
            <p className="text-sm text-slate-500">
              {candidate.role ?? "No role listed"}
            </p>
          </div>

          <StatusBadge status={candidate.status ?? "Qualified"} />
        </div>

        <div className="space-y-1 text-xs text-slate-500">
          <p>{candidate.location ?? "No location listed"}</p>
          <p>Recruiter: {candidate.recruiter ?? "Unassigned"}</p>
          <p>Created: {new Date(candidate.created_at).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  );
}