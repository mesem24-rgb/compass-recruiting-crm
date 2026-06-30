import { supabase } from "./supabase";

/* SECTION: Candidate Type */

export type Candidate = {
  id: string;
  created_at: string;
  name: string;
  role: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  status: string | null;
  source: string | null;
  recruiter: string | null;
  experience: string | null;
  salary: string | null;
  priority_skills: string[] | null;
  secondary_skills: string[] | null;
  keywords: string[] | null;
  preferred_location: string | null;
  willing_to_relocate: boolean | null;
};

/* SECTION: Candidate Queries */

export async function getCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Single Candidate Query */

export async function getCandidateById(id: string): Promise<Candidate | null> {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/* SECTION: Delete Candidate */

export async function deleteCandidate(id: string) {
  const { error } = await supabase.from("candidates").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Update Candidate */

export type UpdateCandidateInput = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  source: string;
  recruiter: string;
  experience: string;
  salary: string;
  priority_skills: string[];
  secondary_skills: string[];
  keywords: string[];
  preferred_location: string;
  willing_to_relocate: boolean;
};

export async function updateCandidate(
  id: string,
  candidate: UpdateCandidateInput,
) {
  const { error } = await supabase
    .from("candidates")
    .update(candidate)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Candidate Note Type */

export type CandidateNote = {
  id: string;
  created_at: string;
  candidate_id: string;
  note: string;
  author: string | null;
};

/* SECTION: Candidate Notes Queries */

export async function getCandidateNotes(
  candidateId: string,
): Promise<CandidateNote[]> {
  const { data, error } = await supabase
    .from("candidate_notes")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Add Candidate Note */

export async function addCandidateNote(candidateId: string, note: string) {
  const { error } = await supabase.from("candidate_notes").insert({
    candidate_id: candidateId,
    note,
    author: "Michael Sullivan",
  });

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Delete Candidate Note */

export async function deleteCandidateNote(id: string) {
  const { error } = await supabase
    .from("candidate_notes")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Update Candidate Status */

export async function updateCandidateStatus(id: string, status: string) {
  const { error } = await supabase
    .from("candidates")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
