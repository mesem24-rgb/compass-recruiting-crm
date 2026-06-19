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