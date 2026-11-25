export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "/",
    description: "Verivox AI Overview & Threat Center",
  },
  {
    name: "Explore",
    href: "/explore",
    badge: "Learn",
    description: "Mechanisms of synthetic voice & deepfake generation",
  },
  {
    name: "Detection Centre",
    href: "/checker",
    badge: "Multimodal",
    description: "Analyze suspicious voice calls, transcripts & video deepfakes",
  },
  {
    name: "AI Assistant",
    href: "/assistant",
    badge: "Copilot",
    description: "Real-time scam triage and conversational defense advice",
  },
  {
    name: "Quiz",
    href: "/quiz",
    badge: "24 Questions",
    description: "Test your ability to spot AI-generated audio & scenarios",
  },
  {
    name: "Safety",
    href: "/safety",
    description: "Emergency incident protocol and family code-word system",
  },
  {
    name: "About",
    href: "/about",
    description: "Academic research thesis, architecture & ethics",
  },
];

export const PROJECT_INFO = {
  name: "VERIVOX AI",
  brandName: "Verivox AI",
  fullBrand: "VERIVOX AI",
  tagline: "Understanding, Detecting and Preventing Deepfake and Voice-Cloning Scams",
  subtitle:
    "An academic cybersecurity initiative engineered to demystify generative voice synthesis, detect social engineering exploitation, and empower proactive human defense.",
  version: "1.0.0-PROD",
  institution: "JECRC University, Jaipur · Department of Computer Science & Cybersecurity",
  academicYear: "2025–2026",
  disclaimer:
    "Verivox AI is an academic research and defense education initiative. Threat detection scores and voice-cloning assessments are probabilistic neural heuristics engineered for public awareness and triage assistance, not legally binding certifications.",
};

export const EMERGENCY_CONTACTS = [
  {
    region: "India",
    agency: "National Cyber Crime Reporting Portal",
    hotline: "1930",
    url: "https://cybercrime.gov.in",
    description: "Financial fraud & deepfake extortion emergency line",
  },
  {
    region: "United States",
    agency: "FBI Internet Crime Complaint Center (IC3) & FTC",
    hotline: "1-877-FTC-HELP",
    url: "https://www.ic3.gov",
    description: "Federal impersonation & voice cloning fraud reports",
  },
  {
    region: "United Kingdom",
    agency: "Action Fraud & National Cyber Security Centre",
    hotline: "0300 123 2040",
    url: "https://www.actionfraud.police.uk",
    description: "National police reporting center for fraud and cyber threats",
  },
  {
    region: "European Union",
    agency: "Europol EC3 (European Cybercrime Centre)",
    hotline: "Local National CERT",
    url: "https://www.europol.europa.eu/about-europol/european-cybercrime-centre-ec3",
    description: "Cross-border synthetic media fraud coordination",
  },
];
