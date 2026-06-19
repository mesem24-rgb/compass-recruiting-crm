/* SECTION: Candidate Queries */

import { supabase } from "./supabase";

export async function getCandidates() {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}