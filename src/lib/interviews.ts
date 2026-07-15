import { supabase } from "@/lib/supabase";

/* SECTION: Interview Type */

export type Interview = {
  id: string;
  created_at: string;
  candidate_id: string;
  job_order_id: string | null;
  recruiter_id: string | null;
  interview_type: string;
  interview_date: string;
  interview_time: string;
  timezone: string | null;
  interviewer: string | null;
  meeting_location: string | null;
  notes: string | null;
  status: string;
};

/* SECTION: Create Interview Input */

export type CreateInterviewInput = {
  candidate_id: string;
  job_order_id?: string | null;
  recruiter_id?: string | null;
  interview_type: string;
  interview_date: string;
  interview_time: string;
  timezone?: string | null;
  interviewer?: string | null;
  meeting_location?: string | null;
  notes?: string | null;
  status?: string;
};

/* SECTION: Get Candidate Interviews */

export async function getInterviewsForCandidate(
  candidateId: string,
): Promise<Interview[]> {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("interview_date", { ascending: true })
    .order("interview_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Get Upcoming Interviews */

export async function getUpcomingInterviews(): Promise<Interview[]> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .gte("interview_date", today)
    .order("interview_date", { ascending: true })
    .order("interview_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Create Interview */

export async function createInterview(input: CreateInterviewInput) {
  const { data, error } = await supabase
    .from("interviews")
    .insert({
      ...input,
      status: input.status ?? "Scheduled",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Interview;
}

/* SECTION: Update Interview */

export async function updateInterview(
  interviewId: string,
  updates: Partial<CreateInterviewInput>,
) {
  const { data, error } = await supabase
    .from("interviews")
    .update(updates)
    .eq("id", interviewId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Interview;
}

/* SECTION: Delete Interview */

export async function deleteInterview(interviewId: string) {
  const { error } = await supabase
    .from("interviews")
    .delete()
    .eq("id", interviewId);

  if (error) {
    throw new Error(error.message);
  }
}