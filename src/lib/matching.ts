import type { Candidate } from "@/lib/candidates";
import type { JobOrder } from "@/lib/job-orders";

/* SECTION: Match Result Type */

export type CandidateMatch = {
  candidate: Candidate;
  score: number;

  matchedPrioritySkills: string[];
  matchedSecondarySkills: string[];
  matchedKeywords: string[];

  locationMatch: boolean;
  relocationMatch: boolean;

  breakdown: {
    priority: number;
    secondary: number;
    keywords: number;
    location: number;
    relocation: number;
  };
};

/* SECTION: Normalize Text */

function normalize(value: string) {
  return value.toLowerCase().trim();
}

/* SECTION: Find Overlap */

function findMatches(candidateValues: string[], jobValues: string[]) {
  const normalizedCandidateValues = candidateValues.map(normalize);

  return jobValues.filter((jobValue) => {
    const normalizedJobValue = normalize(jobValue);

    return normalizedCandidateValues.some(
      (candidateValue) =>
        candidateValue.includes(normalizedJobValue) ||
        normalizedJobValue.includes(candidateValue),
    );
  });
}

/* SECTION: Candidate Match Scoring */

export function scoreCandidateForJob(
  candidate: Candidate,
  job: JobOrder,
): CandidateMatch {
  const matchedPrioritySkills = findMatches(
    candidate.priority_skills ?? [],
    job.priority_skills ?? [],
  );

  const matchedSecondarySkills = findMatches(
    candidate.secondary_skills ?? [],
    job.secondary_skills ?? [],
  );

  const matchedKeywords = findMatches(
    candidate.keywords ?? [],
    job.keywords ?? [],
  );

  const candidateLocation = normalize(candidate.location ?? "");
  const candidatePreferredLocation = normalize(
    candidate.preferred_location ?? "",
  );
  const jobLocation = normalize(job.preferred_location ?? job.location ?? "");

  const locationMatch =
    !!jobLocation &&
    (candidateLocation.includes(jobLocation) ||
      candidatePreferredLocation.includes(jobLocation) ||
      jobLocation.includes(candidateLocation));

  const relocationMatch =
    !locationMatch && candidate.willing_to_relocate === true;

  const breakdown = {
    priority: matchedPrioritySkills.length * 25,
    secondary: matchedSecondarySkills.length * 12,
    keywords: matchedKeywords.length * 8,
    location: locationMatch ? 15 : 0,
    relocation: relocationMatch ? 8 : 0,
  };

  const score = Math.min(
    breakdown.priority +
      breakdown.secondary +
      breakdown.keywords +
      breakdown.location +
      breakdown.relocation,
    100,
  );

  return {
    candidate,
    score,
    matchedPrioritySkills,
    matchedSecondarySkills,
    matchedKeywords,
    locationMatch,
    relocationMatch,
    breakdown,
  };
}

/* SECTION: Get Ranked Matches */

export function getRankedCandidateMatches(
  candidates: Candidate[],
  job: JobOrder,
): CandidateMatch[] {
  return candidates
    .map((candidate) => scoreCandidateForJob(candidate, job))
    .filter(
      (match) =>
        match.matchedPrioritySkills.length > 0 ||
        match.matchedSecondarySkills.length > 0 ||
        match.matchedKeywords.length > 0,
    )
    .sort((a, b) => b.score - a.score);
}
