/* SECTION: Recruiters */

export const recruiters = [
  {
    id: "michael-sullivan",
    name: "Michael Sullivan",
  },
  {
    id: "hans-denton",
    name: "Hans Denton",
  },
];

/* SECTION: Recruiter Lookup */

export function getRecruiterId(name: string) {
  return (
    recruiters.find((recruiter) => recruiter.name === name)?.id ?? ""
  );
}

export function getRecruiterName(id: string) {
  return (
    recruiters.find((recruiter) => recruiter.id === id)?.name ?? ""
  );
}