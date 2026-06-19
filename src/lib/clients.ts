import { supabase } from "./supabase";

/* SECTION: Client Type */

export type Client = {
  id: string;
  created_at: string;
  company: string;
  contact: string | null;
  email: string | null;
  phone: string | null;
  industry: string | null;
  location: string | null;
  open_jobs: number | null;
  placements: number | null;
  revenue: string | null;
};

/* SECTION: Client Queries */

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/* SECTION: Single Client Query */

export async function getClientById(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/* SECTION: Create Client */

export type CreateClientInput = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  revenue: string;
};

export async function createClient(client: CreateClientInput) {
  const { error } = await supabase.from("clients").insert(client);

  if (error) {
    throw new Error(error.message);
  }
}