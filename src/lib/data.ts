export const dashboardStats = [
  { label: "Open Positions", value: "42", change: "+8 this month" },
  { label: "Candidates", value: "126", change: "+24 this month" },
  { label: "Interviews", value: "18", change: "This week" },
  { label: "Placements", value: "7", change: "+3 this month" },
];

export const candidates = [
  {
    id: "cand-001",
    name: "Amanda Pierce",
    role: "Operations Manager",
    status: "Interview",
    recruiter: "Michael Sullivan",
    location: "Dallas, TX",
    email: "amanda.pierce@email.com",
    phone: "(214) 555-0182",
    source: "LinkedIn",
    experience: "12 years",
    salary: "$95,000",
    lastContact: "2 days ago",
    notes: [
      "Strong operations background across multi-unit leadership.",
      "Interested in relocation for the right opportunity.",
      "Scheduled for second interview with Premier Hospitality Group.",
    ],
  },
  {
    id: "cand-002",
    name: "James Carter",
    role: "District Manager",
    status: "Submitted",
    recruiter: "Hans Denton",
    location: "Atlanta, GA",
    email: "james.carter@email.com",
    phone: "(404) 555-0148",
    source: "Referral",
    experience: "15 years",
    salary: "$110,000",
    lastContact: "1 day ago",
    notes: [
      "Submitted to National Food Service Group.",
      "Strong leadership background.",
      "Open to hybrid travel schedule.",
    ],
  },
  {
    id: "cand-003",
    name: "Rachel Nguyen",
    role: "General Manager",
    status: "Qualified",
    recruiter: "Michael Sullivan",
    location: "Houston, TX",
    email: "rachel.nguyen@email.com",
    phone: "(713) 555-0199",
    source: "Indeed",
    experience: "9 years",
    salary: "$82,000",
    lastContact: "Today",
    notes: [
      "Qualified for General Manager opening.",
      "Needs compensation discussion before submission.",
      "Strong customer service and team-building background.",
    ],
  },
];

export const jobOrders = [
  {
    id: "job-001",
    title: "Regional Operations Manager",
    client: "Premier Hospitality Group",
    status: "Open",
    candidates: 12,
    priority: "High",
    location: "Dallas, TX",
    salaryRange: "$110,000 - $130,000",
    assignedRecruiter: "Michael Sullivan",
    description:
      "Lead multi-unit operations across a high-growth hospitality region.",
  },
  {
    id: "job-002",
    title: "General Manager",
    client: "Gulf Coast Retail Partners",
    status: "Open",
    candidates: 8,
    priority: "Medium",
    location: "Gulfport, MS",
    salaryRange: "$75,000 - $90,000",
    assignedRecruiter: "Hans Denton",
    description:
      "Oversee daily store operations, hiring, training, and sales performance.",
  },
  {
    id: "job-003",
    title: "District Leader",
    client: "National Food Service Group",
    status: "Interviewing",
    candidates: 5,
    priority: "High",
    location: "Atlanta, GA",
    salaryRange: "$105,000 - $125,000",
    assignedRecruiter: "Michael Sullivan",
    description:
      "Manage district-level operations, leadership development, and client performance.",
  },
];

export const clients = [
  {
    id: "client-001",
    company: "Premier Hospitality Group",
    contact: "Sarah Mitchell",
    email: "sarah.mitchell@premierhospitality.com",
    phone: "(214) 555-0133",
    location: "Dallas, TX",
    industry: "Hospitality",
    openJobs: 4,
    placements: 9,
    revenue: "$185,000",
    notes: [
      "High-volume hospitality client with recurring management needs.",
      "Prefers candidates with multi-unit leadership experience.",
      "Current priority: Regional Operations Manager.",
    ],
  },
  {
    id: "client-002",
    company: "Gulf Coast Retail Partners",
    contact: "David Allen",
    email: "david.allen@gulfcoastretail.com",
    phone: "(228) 555-0174",
    location: "Gulfport, MS",
    industry: "Retail",
    openJobs: 2,
    placements: 5,
    revenue: "$92,000",
    notes: [
      "Regional retail client focused on store leadership roles.",
      "Prefers candidates with strong retention and training background.",
    ],
  },
  {
    id: "client-003",
    company: "National Food Service Group",
    contact: "Karen Brooks",
    email: "karen.brooks@nfsg.com",
    phone: "(404) 555-0127",
    location: "Atlanta, GA",
    industry: "Food Service",
    openJobs: 6,
    placements: 14,
    revenue: "$260,000",
    notes: [
      "Large national client with consistent leadership hiring needs.",
      "Travel flexibility is important for district-level candidates.",
    ],
  },
];

export const quickActions = [
  { label: "Add Candidate", description: "Create a new candidate profile" },
  { label: "New Job Order", description: "Add a new open role" },
  { label: "Add Client", description: "Create a new client record" },
];

export const recentActivities = [
  {
    title: "Amanda Pierce moved to Interview",
    description: "Michael Sullivan updated candidate status",
    time: "2 hours ago",
  },
  {
    title: "James Carter submitted to client",
    description: "Submitted to National Food Service Group",
    time: "5 hours ago",
  },
  {
    title: "Rachel Nguyen qualified",
    description: "Candidate moved into qualified pipeline",
    time: "Yesterday",
  },
];

export const candidateStatusSummary = [
  { label: "Qualified", value: 34 },
  { label: "Submitted", value: 28 },
  { label: "Interview", value: 18 },
  { label: "Offer", value: 9 },
  { label: "Placed", value: 7 },
];