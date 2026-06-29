import { supabase } from "./supabase";

/* SECTION: Candidate Submission Type */

export type CandidateSubmission = {
  id: string;
  created_at: string;
  candidate_id: string;
  job_order_id: string;
  stage: string | null;
  notes: string | null;
};

/* SECTION: Candidate Submission With Candidate */

export type CandidateSubmissionWithCandidate = CandidateSubmission & {
  candidates: {
    id: string;
    name: string;
    role: string | null;
    status: string | null;
    location: string | null;
    recruiter: string | null;
  } | null;
};

/* SECTION: Create Candidate Submission */

export async function createCandidateSubmission({
  candidateId,
  jobOrderId,
  stage = "Submitted",
  notes = "",
}: {
  candidateId: string;
  jobOrderId: string;
  stage?: string;
  notes?: string;
}) {
  const { error } = await supabase.from("candidate_submissions").insert({
    candidate_id: candidateId,
    job_order_id: jobOrderId,
    stage,
    notes,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Get Submissions For Job Order */

export async function getSubmissionsForJobOrder(
  jobOrderId: string,
): Promise<CandidateSubmissionWithCandidate[]> {
  const { data, error } = await supabase
    .from("candidate_submissions")
    .select(
      `
      *,
      candidates (
        id,
        name,
        role,
        status,
        location,
        recruiter
      )
    `,
    )
    .eq("job_order_id", jobOrderId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Delete Candidate Submission */

export async function deleteCandidateSubmission(id: string) {
  const { error } = await supabase
    .from("candidate_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}