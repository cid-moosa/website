export type ProgramTheme = {
  primary: string;
  secondary: string;
  accent: string;
  emojis: string[];
  hue: number;
};

export const PROGRAM_THEMES: Record<string, ProgramTheme> = {
  bba: {
    primary: "#fbbf24",
    secondary: "#60a5fa",
    accent: "#f59e0b",
    emojis: ["📈", "▲", "ROI", "💼"],
    hue: 45,
  },
  bca: {
    primary: "#3b82f6",
    secondary: "#22c55e",
    accent: "#38bdf8",
    emojis: ["</>", "AI", "&&", "{}"],
    hue: 210,
  },
  cyber: {
    primary: "#00ff66",
    secondary: "#34d399",
    accent: "#22c55e",
    emojis: ["01", "0x", "FF", "⚡", "🛡️"],
    hue: 145,
  },
  psychology: {
    primary: "#a855f7",
    secondary: "#e879f9",
    accent: "#c084fc",
    emojis: ["Ψ", "🧠", "α", "β", "∞"],
    hue: 280,
  },
  "bcom-acc": {
    primary: "#10b981",
    secondary: "#fbbf24",
    accent: "#34d399",
    emojis: ["₹", "$", "€", "∑", "∆"],
    hue: 155,
  },
  "bcom-fin": {
    primary: "#10b981",
    secondary: "#fbbf24",
    accent: "#34d399",
    emojis: ["₹", "$", "€", "∑", "∆"],
    hue: 155,
  },
  "bcom-log": {
    primary: "#38bdf8",
    secondary: "#14b8a6",
    accent: "#5eead4",
    emojis: ["⚓", "🚢", "✈️", "📦"],
    hue: 195,
  },
  msw: {
    primary: "#fb923c",
    secondary: "#f59e0b",
    accent: "#fb7185",
    emojis: ["🤝", "♥", "★", "👥"],
    hue: 25,
  },
  "mcom-fin": {
    primary: "#10b981",
    secondary: "#fbbf24",
    accent: "#34d399",
    emojis: ["₹", "$", "📊", "∑"],
    hue: 155,
  },
  "mcom-mkt": {
    primary: "#10b981",
    secondary: "#fbbf24",
    accent: "#34d399",
    emojis: ["📈", "🎯", "💰", "∑"],
    hue: 155,
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Academics",
    href: "/programs",
    children: [
      { label: "BBA", href: "/programs/bba" },
      { label: "BCA", href: "/programs/bca" },
      { label: "B.Sc Cyber Forensics", href: "/programs/cyber" },
      { label: "B.Sc Psychology", href: "/programs/psychology" },
      { label: "B.Com (CA & Taxation)", href: "/programs/bcom-acc" },
      { label: "B.Com (Finance)", href: "/programs/bcom-fin" },
      { label: "B.Com (Logistics)", href: "/programs/bcom-log" },
      { label: "M.Com (Finance)", href: "/programs/mcom-fin" },
      { label: "M.Com (Marketing)", href: "/programs/mcom-mkt" },
      { label: "MSW", href: "/programs/msw" },
    ],
  },
  {
    label: "IQAC & Compliance",
    href: "/compliance/iqac",
    children: [
      { label: "IQAC Overview", href: "/compliance/iqac" },
      { label: "AQAR Reports", href: "/compliance/iqac?category=AQAR" },
      { label: "Anti-Ragging Cell", href: "/compliance/anti-ragging" },
      { label: "ICC / POSH Committee", href: "/compliance/icc" },
      { label: "Equal Opportunity Cell", href: "/compliance/eoc" },
      { label: "NIRF Disclosures", href: "/compliance/nirf" },
      { label: "RTI", href: "/compliance/rti" },
      { label: "Affiliation Documents", href: "/compliance/affiliation" },
    ],
  },
  { label: "Campus Life", href: "/#clubs" },
  { label: "News & Circulars", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export const GRIEVANCE_CATEGORIES = [
  "Anti-Ragging",
  "Academic",
  "POSH/ICC",
  "Infrastructure",
  "Examinations",
  "General",
] as const;

export const NOTICE_CATEGORIES = [
  "Academic",
  "Exam",
  "Event",
  "Urgent",
] as const;

export const IQAC_CATEGORIES = [
  "SSR",
  "AQAR",
  "Minutes",
  "Feedback",
] as const;
