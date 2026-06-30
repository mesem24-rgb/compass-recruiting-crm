import { supabase } from "./supabase";

/* SECTION: Job Order Type */

export type JobOrder = {
  id: string;
  created_at: string;
  title: string;
  client: string | null;
  status: string | null;
  priority: string | null;
  location: string | null;
  salary_range: string | null;
  assigned_recruiter: string | null;
  description: string | null;
  candidates: number | null;
  priority_skills: string[] | null;
  secondary_skills: string[] | null;
  keywords: string[] | null;
  preferred_location: string | null;
  replacement_priority: boolean | null;
};

/* SECTION: Job Order Queries */

export async function getJobOrders(): Promise<JobOrder[]> {
  const { data, error } = await supabase
    .from("job_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Single Job Order Query */

export async function getJobOrderById(id: string): Promise<JobOrder | null> {
  const { data, error } = await supabase
    .from("job_orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/* SECTION: Create Job Order */

export type CreateJobOrderInput = {
  title: string;
  client: string;
  status: string;
  priority: string;
  location: string;
  salary_range: string;
  assigned_recruiter: string;
  description: string;
  priority_skills: string[];
  secondary_skills: string[];
  keywords: string[];
  preferred_location: string;
  replacement_priority: boolean;
};

export async function createJobOrder(jobOrder: CreateJobOrderInput) {
  const { error } = await supabase.from("job_orders").insert(jobOrder);

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Update Job Order */

export async function updateJobOrder(
  id: string,
  jobOrder: CreateJobOrderInput,
) {
  const { error } = await supabase
    .from("job_orders")
    .update(jobOrder)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

/* SECTION: Delete Job Order */

export async function deleteJobOrder(id: string) {
  const { error } = await supabase.from("job_orders").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
