export type ClusterKey = "infra" | "finance" | "tech" | "governance" | "research" | "dev";

export interface Partner {
  name: string;
  role: string;
  since: string;
  status?: "active" | "review" | "membership";
}

export interface Cluster {
  key: ClusterKey;
  label: string;
  labelDe: string;
  icon: string;
  partners: Partner[];
}

export const clusters: Cluster[] = [
  {
    key: "infra",
    label: "Infrastructure & Cloud",
    labelDe: "Infrastruktur & Cloud",
    icon: "🌐",
    partners: [
      { name: "Megaport", role: "Partner", since: "März 2026", status: "active" },
      { name: "PacketFabric", role: "Partner", since: "März 2026", status: "active" },
      { name: "BSO", role: "Partner", since: "März 2026", status: "active" },
      { name: "Equinix", role: "Partner", since: "März 2026", status: "active" },
      { name: "Console Connect", role: "Partner", since: "März 2026", status: "active" },
      { name: "PeeringDB", role: "Partner", since: "März 2026", status: "active" },
      { name: "PCCW Global", role: "Partner", since: "März 2026", status: "active" },
    ],
  },
  {
    key: "finance",
    label: "Finance & Payment",
    labelDe: "Finanzen & Payment",
    icon: "💳",
    partners: [
      { name: "Visa", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Mastercard", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "American Express", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "PayPal", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Deutsche Bank", role: "Dev Accelerator", since: "Jan 2026", status: "active" },
      { name: "ING", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "IMF", role: "Account Developer", since: "Jan 2026", status: "active" },
      { name: "EIF", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "EIB", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "World Bank", role: "Partner", since: "Dez 2025", status: "active" },
      { name: "Deutsche Börse", role: "Entwicklungspartner", since: "Jan 2026", status: "active" },
      { name: "SIX Swiss Exchange", role: "VP Treasury", since: "Jan 2026", status: "review" },
      { name: "FINRA", role: "Treasury Portal", since: "März 2025", status: "active" },
    ],
  },
  {
    key: "tech",
    label: "Technology & Hardware",
    labelDe: "Technologie & Hardware",
    icon: "⚡",
    partners: [
      { name: "Apple", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Intel", role: "Developer Innovation", since: "Okt 2024", status: "active" },
      { name: "AMD", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "HP", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "MSI", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Ericsson", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Motorola Solutions", role: "ISV Corporation Partner", since: "Jan 2026", status: "active" },
      { name: "Microsoft", role: "AI Cloud Partner", since: "Sept 2024", status: "active" },
      { name: "Google", role: "Cloud Partner Advantage", since: "Sept 2024", status: "active" },
      { name: "AWS", role: "Innovation StartUps", since: "Okt 2024", status: "active" },
      { name: "IBM", role: "Offizieller Partner", since: "Okt 2024", status: "active" },
      { name: "SAP", role: "Partner", since: "Okt 2024", status: "active" },
      { name: "Oracle", role: "Startup Partner", since: "Okt 2024", status: "active" },
    ],
  },
  {
    key: "governance",
    label: "Global Governance",
    labelDe: "Globale Governance",
    icon: "🏛️",
    partners: [
      { name: "United Nations", role: "Carrier-Vertrieb", since: "Dez 2025", status: "active" },
      { name: "UNICEF", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "UNESCO", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "WHO", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "WTO", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "UN-Habitat", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "UNEP", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "UNCTAD", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
      { name: "NATO", role: "Corp. Partner", since: "Jan 2026", status: "active" },
      { name: "EU Commission", role: "EU AI Pact Ethic", since: "Juli 2025", status: "active" },
      { name: "EBA", role: "Projektmanager", since: "Mai 2025", status: "active" },
      { name: "EUIPO", role: "Pro-Bono", since: "Feb 2026", status: "active" },
      { name: "EU Patent Office", role: "Sys Integration", since: "Aug 2025", status: "active" },
      { name: "Council of EU", role: "EU Experte", since: "Feb 2025", status: "active" },
      { name: "CTBTO", role: "Diplomat Consultant", since: "Okt 2025", status: "active" },
    ],
  },
  {
    key: "research",
    label: "Research & Think Tanks",
    labelDe: "Forschung & Think Tanks",
    icon: "🧠",
    partners: [
      { name: "RUSI", role: "Mitglied", since: "Jan 2026", status: "membership" },
      { name: "Ifri", role: "Mitglied", since: "Jan 2026", status: "membership" },
      { name: "RUSI NextGen", role: "Mitglied", since: "Jan 2026", status: "membership" },
      { name: "Eureka Network", role: "Experte", since: "Okt 2025", status: "active" },
      { name: "NSF", role: "I-Corps Fellow", since: "Okt 2024", status: "active" },
      { name: "500 Global", role: "Accelerator", since: "Feb 2025", status: "active" },
      { name: "KBR Belgium", role: "Archivverwalter", since: "Jan 2026", status: "active" },
      { name: "Nat.Bib. Luxemburg", role: "Archivverwalter", since: "Jan 2026", status: "active" },
      { name: "I.I.C. Parigi", role: "Archivverwalter", since: "Jan 2026", status: "active" },
    ],
  },
  {
    key: "dev",
    label: "Developer & Open Source",
    labelDe: "Developer & Open Source",
    icon: "🚀",
    partners: [
      { name: "GitHub", role: "Developer Program", since: "Okt 2024", status: "active" },
      { name: "Linux Foundation", role: "LFX Mentor", since: "Sept 2025", status: "active" },
      { name: "OpenSSF", role: "Best Practices", since: "Sept 2025", status: "active" },
      { name: "Auth0", role: "Projektentwickler", since: "Sept 2025", status: "active" },
      { name: "Frontegg", role: "Sys Integration", since: "Sept 2025", status: "active" },
      { name: "MLH", role: "LCL Hackathon", since: "Feb 2026", status: "active" },
      { name: "Prisma", role: "Consultant", since: "Okt 2025", status: "active" },
    ],
  },
];

export const hubInfo = {
  name: "HNOSS",
  subtitle: "LCL – Love Crown Love",
  founder: "Z3r0CL0cK",
  mission: "Bridging advanced infrastructure and human integrity",
  tagline: "Trust Trusted Thrust True Truely",
};
