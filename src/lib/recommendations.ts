import type { CandidateMatch } from "@/lib/matching";

export function buildRecommendation(match: CandidateMatch): string[] {
  const reasons: string[] = [];

  if (match.matchedPrioritySkills.length > 0) {
    reasons.push(
      `Matches ${match.matchedPrioritySkills.length} priority skill${match.matchedPrioritySkills.length > 1 ? "s" : ""}.`,
    );
  }

  if (match.matchedSecondarySkills.length > 0) {
    reasons.push(
      `Matches ${match.matchedSecondarySkills.length} preferred skill${match.matchedSecondarySkills.length > 1 ? "s" : ""}.`,
    );
  }

  if (match.matchedKeywords.length > 0) {
    reasons.push(
      `Contains ${match.matchedKeywords.length} matching keyword${match.matchedKeywords.length > 1 ? "s" : ""}.`,
    );
  }

  if (match.locationMatch) {
    reasons.push("Located in the preferred hiring region.");
  }

  if (match.relocationMatch) {
    reasons.push("Candidate is willing to relocate.");
  }

  if (match.score >= 90) {
    reasons.push("Excellent overall fit for this position.");
  } else if (match.score >= 75) {
    reasons.push("Strong overall match.");
  }

  if (match.missingPrioritySkills.length > 0) {
  reasons.push(
    `Missing ${match.missingPrioritySkills.length} priority skill${
      match.missingPrioritySkills.length > 1 ? "s" : ""
    }.`,
  );
}

  return reasons;
}