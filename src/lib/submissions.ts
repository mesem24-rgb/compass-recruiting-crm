import { supabase } from "./supabase";

/* SECTION: Candidate Submission Type */

export type CandidateSubmission = {
  id: string;
  created_at: string;
  candidate_id: string;
  job_order_id: string;

  stage: string | null;

  status: string | null;
  submitted_at: string | null;
  submitted_by: string | null;
  recruiter_notes: string | null;
  client_feedback: string | null;
  match_score: number | null;
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

export type CreateCandidateSubmissionInput = {
  candidateId: string;
  jobOrderId: string;
  stage?: string;
  submittedBy?: string | null;
  recruiterNotes?: string | null;
  matchScore?: number | null;
};

export async function createCandidateSubmission({
  candidateId,
  jobOrderId,
  stage = "Submitted",
  submittedBy = null,
  recruiterNotes = null,
  matchScore = null,
}: CreateCandidateSubmissionInput) {
  const { data, error } = await supabase
    .from("candidate_submissions")
    .insert({
      candidate_id: candidateId,
      job_order_id: jobOrderId,
      stage,
      status: "Submitted",
      submitted_at: new Date().toISOString(),
      submitted_by: submittedBy,
      recruiter_notes: recruiterNotes,
      match_score: matchScore,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CandidateSubmission;
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

/* SECTION: Candidate Submission With Job Order */

export type CandidateSubmissionWithJobOrder = CandidateSubmission & {
  job_orders: {
    id: string;
    title: string;
    client: string | null;
    status: string | null;
    priority: string | null;
  } | null;
};

/* SECTION: Get Submissions For Candidate */

export async function getSubmissionsForCandidate(
  candidateId: string,
): Promise<CandidateSubmissionWithJobOrder[]> {
  const { data, error } = await supabase
    .from("candidate_submissions")
    .select(
      `
      *,
      job_orders (
        id,
        title,
        client,
        status,
        priority
      )
    `,
    )
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}