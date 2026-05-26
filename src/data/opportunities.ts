export type OpportunityType = 'vc' | 'accelerator' | 'hackathon' | 'grant' | 'credits';

export interface Opportunity {
  id: string;
  name: string;
  type: OpportunityType;
  organization: string;
  description: string;
  amount_min: number;
  amount_max: number;
  amount_label: string;
  deadline: string;
  deadline_urgency: 'hot' | 'upcoming' | 'open';
  equity_taken: boolean;
  equity_percent: number | null;
  stage: string[];
  sector_tags: string[];
  geo_restriction: string[];
  eligibility: {
    students_allowed: boolean;
    solo_founder: boolean;
    team_size_min: number;
    revenue_limit: string | null;
  };
  apply_url: string;
  source_url: string;
  scraped_at: string;
  verified: boolean;
  logo: string;
  logoBg: string;
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    name: "Y Combinator — Summer 2025",
    type: "accelerator",
    organization: "Y Combinator",
    description: "The world's most prestigious startup accelerator. Offers funding, mentorship, and unmatched network access. Accepts teams at any stage — idea to growth.",
    amount_min: 500000,
    amount_max: 500000,
    amount_label: "Standard Deal",
    deadline: "2025-06-30",
    deadline_urgency: "upcoming",
    equity_taken: true,
    equity_percent: 7,
    stage: ["pre-seed", "seed", "series-a"],
    sector_tags: ["All Sectors"],
    geo_restriction: ["global"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "ycombinator.com/apply",
    source_url: "ycombinator.com",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/ycombinator.com",
    logoBg: "var(--accent-dim)"
  },
  {
    id: "2",
    name: "ETHGlobal Brussels 2025",
    type: "hackathon",
    organization: "ETHGlobal",
    description: "48-hour Web3 hackathon with $200K+ in sponsor prizes. Build on Ethereum, L2s, and DeFi protocols. Fully funded travel grants available for international participants.",
    amount_min: 200000,
    amount_max: 200000,
    amount_label: "Total Prizes",
    deadline: "2025-07-12",
    deadline_urgency: "upcoming",
    equity_taken: false,
    equity_percent: null,
    stage: ["any"],
    sector_tags: ["Web3", "Crypto"],
    geo_restriction: ["global", "Europe"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "ethglobal.com/brussels",
    source_url: "ethglobal.com",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/ethglobal.com",
    logoBg: "var(--pink-dim)"
  },
  {
    id: "3",
    name: "Sequoia Arc — Cohort 8",
    type: "vc",
    organization: "Sequoia Capital",
    description: "Sequoia's global program for early-stage startups. Offers $1M in funding + 16-week intensive program. Especially strong in AI, consumer, and enterprise.",
    amount_min: 1000000,
    amount_max: 1000000,
    amount_label: "Base Investment",
    deadline: "2025-08-01",
    deadline_urgency: "open",
    equity_taken: true,
    equity_percent: null,
    stage: ["pre-seed", "seed"],
    sector_tags: ["AI", "Consumer", "Enterprise"],
    geo_restriction: ["global"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "sequoiacap.com/arc",
    source_url: "sequoiacap.com",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/sequoiacap.com",
    logoBg: "var(--blue-dim)"
  },
  {
    id: "4",
    name: "Google for Startups — AI First Fund",
    type: "grant",
    organization: "Google",
    description: "Non-dilutive grant program for AI-focused startups. Provides up to $350K in Google Cloud credits, technical mentorship, and co-marketing opportunities.",
    amount_min: 350000,
    amount_max: 350000,
    amount_label: "Cloud Credits",
    deadline: "rolling",
    deadline_urgency: "open",
    equity_taken: false,
    equity_percent: null,
    stage: ["pre-seed", "seed", "series-a"],
    sector_tags: ["AI", "ML"],
    geo_restriction: ["global"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "startup.google.com",
    source_url: "startup.google.com",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/google.com",
    logoBg: "var(--accent-dim)"
  },
  {
    id: "5",
    name: "MLH Global Hack Week",
    type: "hackathon",
    organization: "MLH",
    description: "Major League Hacking's flagship online hackathon open to all students globally. Prizes, swag, internship referrals from top sponsors including GitHub, Microsoft, and Twilio.",
    amount_min: 50000,
    amount_max: 50000,
    amount_label: "Prize Pool",
    deadline: "2025-07-20",
    deadline_urgency: "upcoming",
    equity_taken: false,
    equity_percent: null,
    stage: ["pre-seed"],
    sector_tags: ["Open Track"],
    geo_restriction: ["global"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "mlh.io",
    source_url: "mlh.io",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/mlh.io",
    logoBg: "var(--pink-dim)"
  },
  {
    id: "6",
    name: "a16z SPEEDRUN",
    type: "vc",
    organization: "Andreessen Horowitz",
    description: "Andreessen Horowitz's early-stage program for consumer and AI startups. Fast process — decision in days. Founders retain maximum equity in early rounds.",
    amount_min: 750000,
    amount_max: 750000,
    amount_label: "Avg. Check",
    deadline: "2025-07-15",
    deadline_urgency: "hot",
    equity_taken: true,
    equity_percent: null,
    stage: ["pre-seed"],
    sector_tags: ["Consumer", "AI"],
    geo_restriction: ["US", "global"],
    eligibility: {
      students_allowed: true,
      solo_founder: true,
      team_size_min: 1,
      revenue_limit: null
    },
    apply_url: "a16z.com",
    source_url: "a16z.com",
    scraped_at: new Date().toISOString(),
    verified: true,
    logo: "https://logo.clearbit.com/a16z.com",
    logoBg: "var(--blue-dim)"
  }
];
