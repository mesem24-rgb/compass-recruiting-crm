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
};

export async function updateCandidate(id: string, candidate: UpdateCandidateInput) {
  const { error } = await supabase
    .from("candidates")
    .update(candidate)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}