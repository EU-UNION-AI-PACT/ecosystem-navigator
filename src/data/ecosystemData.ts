export type ClusterKey = "infra" | "finance" | "tech" | "governance" | "research" | "dev";

export interface Partner {
  name: string;
  role: string;
  since: string;
  sinceDate: string; // ISO-ish for sorting: "2026-03" 
  status?: "active" | "review" | "membership";
  leader?: string;
  leaderTitle?: string;
  description?: string;
  integration?: string;
  website?: string;
  lat?: number;
  lng?: number;
  city?: string;
  country?: string;
}

export interface Cluster {
  key: ClusterKey;
  label: string;
  labelDe: string;
  icon: string;
  description: string;
  partners: Partner[];
}

export const clusters: Cluster[] = [
  {
    key: "infra",
    label: "Infrastructure & Cloud",
    labelDe: "Infrastruktur & Cloud",
    icon: "🌐",
    description: "Internet-Backbone, Rechenzentren und Cloud-Interconnect-Partner, die die physische und virtuelle Netzwerkinfrastruktur des Ökosystems bilden.",
    partners: [
      { name: "Megaport", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Michael Reid", leaderTitle: "CEO", description: "Globaler Anbieter von Netzwerk-as-a-Service (NaaS) für elastische Interconnection.", integration: "NaaS API, Cloud Router, Virtual Cross Connects", lat: -33.87, lng: 151.21, city: "Sydney", country: "Australien" },
      { name: "PacketFabric", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Dave Ward", leaderTitle: "CEO", description: "Automatisierte Cloud-Networking-Plattform für On-Demand-Konnektivität.", integration: "Cloud Connectivity, Private Backbone", lat: 37.77, lng: -122.42, city: "San Francisco", country: "USA" },
      { name: "BSO", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Michael Sheridan", leaderTitle: "CEO", description: "Low-Latency Infrastruktur- und Netzwerklösungen für Finanzmärkte.", integration: "Low-Latency Network, Financial Data", lat: 51.51, lng: -0.13, city: "London", country: "UK" },
      { name: "Equinix", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Adaire Fox-Martin", leaderTitle: "CEO", description: "Weltgrößter Betreiber von Colocation-Rechenzentren und Interconnection-Plattformen.", integration: "Equinix Fabric, IBX Colocation, Metal", lat: 37.39, lng: -122.08, city: "Silicon Valley", country: "USA" },
      { name: "Console Connect", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Michael Glynn", leaderTitle: "VP Digital", description: "Software-Defined Interconnection von PCCW Global für Echtzeit-Netzwerke.", integration: "SDN Interconnection, CloudConnect", lat: 22.32, lng: 114.17, city: "Hong Kong", country: "China" },
      { name: "PeeringDB", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Community Board", leaderTitle: "Board", description: "Freie Datenbank für Internet-Peering und Interconnection-Informationen.", integration: "Peering Exchange Data, API", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
      { name: "PCCW Global", role: "Partner", since: "März 2026", sinceDate: "2026-03", status: "active", leader: "Frederick Chui", leaderTitle: "CEO", description: "Internationaler Telekommunikationsanbieter mit globalem Glasfaser-Backbone.", integration: "Global Transit, Managed Services", lat: 22.32, lng: 114.17, city: "Hong Kong", country: "China" },
    ],
  },
  {
    key: "finance",
    label: "Finance & Payment",
    labelDe: "Finanzen & Payment",
    icon: "💳",
    description: "Banking, Börsen, globale Finanzinfrastruktur und Zahlungsnetzwerke. Ethische Finanzinnovation und regulatorische Zusammenarbeit.",
    partners: [
      { name: "Visa", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Ryan McInerney", leaderTitle: "CEO", description: "Weltgrößtes Zahlungsnetzwerk mit über 4 Milliarden Karten.", integration: "Visa Developer API, Payment Gateway", lat: 37.39, lng: -122.15, city: "Foster City", country: "USA" },
      { name: "Mastercard", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Michael Miebach", leaderTitle: "CEO", description: "Globales Technologieunternehmen in der Zahlungsbranche.", integration: "Mastercard Gateway, Open Banking API", lat: 41.07, lng: -73.77, city: "Purchase", country: "USA" },
      { name: "American Express", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Stephen Squeri", leaderTitle: "Chairman & CEO", description: "Premium-Finanzdienstleister mit globalem Zahlungsnetzwerk.", integration: "Amex API, Partner Offers", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
      { name: "PayPal", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Alex Chriss", leaderTitle: "CEO", description: "Führende digitale Zahlungsplattform für Online-Commerce.", integration: "PayPal SDK, Braintree, Venmo API", lat: 37.25, lng: -121.93, city: "San Jose", country: "USA" },
      { name: "Deutsche Bank", role: "Dev Accelerator", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Christian Sewing", leaderTitle: "CEO", description: "Größte Bank Deutschlands mit globalem Investment Banking.", integration: "Developer Portal, API Banking", lat: 50.11, lng: 8.68, city: "Frankfurt", country: "Deutschland" },
      { name: "ING", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Steven van Rijswijk", leaderTitle: "CEO", description: "Niederländische Großbank mit Fokus auf digitale Innovation.", integration: "Open Banking, PSD2 API", lat: 52.37, lng: 4.9, city: "Amsterdam", country: "Niederlande" },
      { name: "IMF", role: "Account Developer", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Kristalina Georgieva", leaderTitle: "Managing Director", description: "Internationaler Währungsfonds – Stabilität des globalen Finanzsystems.", integration: "Data API, Economic Indicators", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },
      { name: "EIF", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Marjut Falkstedt", leaderTitle: "CEO", description: "Europäischer Investitionsfonds – Finanzierung für KMU und Innovation.", integration: "InvestEU, EIF Funding Programs", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },
      { name: "EIB", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Nadia Calviño", leaderTitle: "Präsidentin", description: "Europäische Investitionsbank – Bank der EU für langfristige Finanzierung.", integration: "EIB Innovation Finance", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },
      { name: "World Bank", role: "Partner", since: "Dez 2025", sinceDate: "2025-12", status: "active", leader: "Ajay Banga", leaderTitle: "Präsident", description: "Internationale Finanzinstitution für Entwicklungsfinanzierung.", integration: "World Bank Open Data API", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },
      { name: "Deutsche Börse", role: "Entwicklungspartner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Theodor Weimer", leaderTitle: "CEO", description: "Betreiber der Frankfurter Wertpapierbörse und Xetra.", integration: "Market Data API, Xetra Trading", lat: 50.11, lng: 8.68, city: "Frankfurt", country: "Deutschland" },
      { name: "SIX Swiss Exchange", role: "VP Treasury", since: "Jan 2026", sinceDate: "2026-01", status: "review", leader: "Jos Dijsselhof", leaderTitle: "CEO", description: "Schweizer Börse und Finanzinfrastruktur.", integration: "SIX API, Swiss Digital Exchange", lat: 47.38, lng: 8.54, city: "Zürich", country: "Schweiz" },
      { name: "FINRA", role: "Treasury Portal", since: "März 2025", sinceDate: "2025-03", status: "active", leader: "Robert Cook", leaderTitle: "CEO", description: "US-Regulierungsbehörde für Broker-Dealer.", integration: "FINRA Gateway, Compliance API", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },
    ],
  },
  {
    key: "tech",
    label: "Technology & Hardware",
    labelDe: "Technologie & Hardware",
    icon: "⚡",
    description: "Hyperscaler, Hardware-Hersteller und Technologiegiganten. Cloud-Computing, KI, Halbleiter und Telekommunikation.",
    partners: [
      { name: "Apple", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Tim Cook", leaderTitle: "CEO", description: "Technologiekonzern – iPhone, Mac, Services-Ökosystem.", integration: "Apple Developer Program, App Store", lat: 37.33, lng: -122.01, city: "Cupertino", country: "USA" },
      { name: "Intel", role: "Developer Innovation", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Pat Gelsinger", leaderTitle: "CEO", description: "Weltführender Halbleiterhersteller für Prozessoren.", integration: "Intel Developer Zone, oneAPI", lat: 37.39, lng: -121.96, city: "Santa Clara", country: "USA" },
      { name: "AMD", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Lisa Su", leaderTitle: "CEO", description: "Hochleistungs-CPUs und GPUs für Computing und KI.", integration: "ROCm, AMD Developer Tools", lat: 37.38, lng: -121.97, city: "Santa Clara", country: "USA" },
      { name: "HP", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Enrique Lores", leaderTitle: "CEO", description: "PC- und Druckerhersteller mit Enterprise-Lösungen.", integration: "HP Developer Portal", lat: 37.41, lng: -122.14, city: "Palo Alto", country: "USA" },
      { name: "MSI", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Sheng-Chang Chiang", leaderTitle: "Chairman", description: "Gaming-Hardware, Motherboards und High-Performance-Computing.", integration: "MSI Partner Program", lat: 25.03, lng: 121.57, city: "Taipei", country: "Taiwan" },
      { name: "Ericsson", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Börje Ekholm", leaderTitle: "CEO", description: "Führender Anbieter von 5G-Telekommunikationsinfrastruktur.", integration: "Ericsson IoT, 5G Platform", lat: 59.33, lng: 18.07, city: "Stockholm", country: "Schweden" },
      { name: "Motorola Solutions", role: "ISV Corporation Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Greg Brown", leaderTitle: "CEO", description: "Sicherheits- und Kommunikationslösungen für Unternehmen.", integration: "Command Center, Radio APIs", lat: 42.07, lng: -87.94, city: "Chicago", country: "USA" },
      { name: "Microsoft", role: "AI Cloud Partner", since: "Sept 2024", sinceDate: "2024-09", status: "active", leader: "Satya Nadella", leaderTitle: "CEO", description: "Hyperscaler mit Azure, Microsoft 365 und OpenAI-Integration.", integration: "Azure, Microsoft 365, Power Platform", lat: 47.64, lng: -122.13, city: "Redmond", country: "USA" },
      { name: "Google", role: "Cloud Partner Advantage", since: "Sept 2024", sinceDate: "2024-09", status: "active", leader: "Sundar Pichai", leaderTitle: "CEO", description: "Suchmaschine, Cloud-Plattform und KI-Innovator.", integration: "Google Cloud, Vertex AI, Firebase", lat: 37.42, lng: -122.08, city: "Mountain View", country: "USA" },
      { name: "AWS", role: "Innovation StartUps", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Matt Garman", leaderTitle: "CEO", description: "Marktführer im Cloud-Computing mit 200+ Services.", integration: "AWS Activate, Lambda, S3, EC2", lat: 47.62, lng: -122.34, city: "Seattle", country: "USA" },
      { name: "IBM", role: "Offizieller Partner", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Arvind Krishna", leaderTitle: "CEO", description: "Enterprise-KI, Hybrid-Cloud und Quantencomputing.", integration: "IBM Cloud, Watson, Quantum", lat: 41.11, lng: -73.72, city: "Armonk", country: "USA" },
      { name: "SAP", role: "Partner", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Christian Klein", leaderTitle: "CEO", description: "Europas größter Softwarekonzern für Unternehmensanwendungen.", integration: "SAP BTP, S/4HANA, Integration Suite", lat: 49.29, lng: 8.64, city: "Walldorf", country: "Deutschland" },
      { name: "Oracle", role: "Startup Partner", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Safra Catz", leaderTitle: "CEO", description: "Enterprise-Datenbanken, Cloud-Infrastruktur und ERP.", integration: "OCI, Oracle Cloud Free Tier", lat: 36.62, lng: -121.92, city: "Austin", country: "USA" },
    ],
  },
  {
    key: "governance",
    label: "Global Governance",
    labelDe: "Globale Governance",
    icon: "🏛️",
    description: "UN-System, EU-Institutionen, NATO und internationale Regulierungsbehörden. Diplomatische Konsultation und ethische Innovation.",
    partners: [
      { name: "United Nations", role: "Carrier-Vertrieb", since: "Dez 2025", sinceDate: "2025-12", status: "active", leader: "António Guterres", leaderTitle: "Generalsekretär", description: "Hauptforum für internationale Zusammenarbeit und Friedenssicherung.", integration: "UN Data, SDG APIs, Innovation Network", lat: 40.75, lng: -73.97, city: "New York", country: "USA" },
      { name: "UNICEF", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Catherine Russell", leaderTitle: "Executive Director", description: "UN-Kinderhilfswerk für weltweiten Kinderschutz.", integration: "UNICEF Innovation Fund", lat: 40.75, lng: -73.97, city: "New York", country: "USA" },
      { name: "UNESCO", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Audrey Azoulay", leaderTitle: "Generaldirektorin", description: "UN-Organisation für Bildung, Wissenschaft und Kultur.", integration: "Digital Heritage, AI Ethics", lat: 48.85, lng: 2.31, city: "Paris", country: "Frankreich" },
      { name: "WHO", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Dr. Tedros Ghebreyesus", leaderTitle: "Generaldirektor", description: "Weltgesundheitsorganisation – globale Gesundheitspolitik.", integration: "WHO Health Data API", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
      { name: "WTO", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Ngozi Okonjo-Iweala", leaderTitle: "Generaldirektorin", description: "Welthandelsorganisation – Regeln für internationalen Handel.", integration: "Trade Data Portal", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
      { name: "UN-Habitat", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Maimunah Mohd Sharif", leaderTitle: "Executive Director", description: "UN-Programm für nachhaltige Stadtentwicklung.", integration: "Urban Data Platform", lat: -1.29, lng: 36.82, city: "Nairobi", country: "Kenia" },
      { name: "UNEP", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Inger Andersen", leaderTitle: "Executive Director", description: "UN-Umweltprogramm für globale Umweltpolitik.", integration: "World Environment Situation Room", lat: -1.29, lng: 36.82, city: "Nairobi", country: "Kenia" },
      { name: "UNCTAD", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Rebeca Grynspan", leaderTitle: "Generalsekretärin", description: "UN-Handels- und Entwicklungskonferenz.", integration: "Trade & Development Data", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
      { name: "NATO", role: "Corp. Partner", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Mark Rutte", leaderTitle: "Generalsekretär", description: "Nordatlantikpakt – Verteidigungsbündnis für Frieden und Sicherheit.", integration: "NATO Innovation Fund, DIANA", lat: 50.88, lng: 4.42, city: "Brüssel", country: "Belgien" },
      { name: "EU Commission", role: "EU AI Pact Ethic", since: "Juli 2025", sinceDate: "2025-07", status: "active", leader: "Ursula von der Leyen", leaderTitle: "Präsidentin", description: "Exekutivorgan der EU – Gesetzgebung und politische Führung.", integration: "EU AI Act, Horizon Europe, Digital Europe", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
      { name: "EBA", role: "Projektmanager", since: "Mai 2025", sinceDate: "2025-05", status: "active", leader: "José Manuel Campa", leaderTitle: "Chairperson", description: "Europäische Bankenaufsichtsbehörde – Finanzregulierung.", integration: "EBA Extranet, Regulatory Data", lat: 48.86, lng: 2.35, city: "Paris", country: "Frankreich" },
      { name: "EUIPO", role: "Pro-Bono", since: "Feb 2026", sinceDate: "2026-02", status: "active", leader: "João Negrão", leaderTitle: "Executive Director", description: "EU-Amt für geistiges Eigentum – Marken und Designs.", integration: "TMview, DesignView, IP Tools", lat: 38.35, lng: -0.49, city: "Alicante", country: "Spanien" },
      { name: "EU Patent Office", role: "Sys Integration", since: "Aug 2025", sinceDate: "2025-08", status: "active", leader: "António Campinos", leaderTitle: "Präsident", description: "Europäisches Patentamt – Patentschutz in Europa.", integration: "EPO Open Patent Services API", lat: 48.14, lng: 11.58, city: "München", country: "Deutschland" },
      { name: "Council of EU", role: "EU Experte", since: "Feb 2025", sinceDate: "2025-02", status: "active", leader: "Rotating Presidency", leaderTitle: "Ratspräsidentschaft", description: "Rat der Europäischen Union – Stimme der EU-Regierungen.", integration: "EU Legislative Process", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
      { name: "CTBTO", role: "Diplomat Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Robert Floyd", leaderTitle: "Executive Secretary", description: "Organisation für das umfassende Verbot von Nuklearversuchen.", integration: "IMS Data, Verification Tech", lat: 48.21, lng: 16.37, city: "Wien", country: "Österreich" },
    ],
  },
  {
    key: "research",
    label: "Research & Think Tanks",
    labelDe: "Forschung & Think Tanks",
    icon: "🧠",
    description: "Forschungsinstitute, Sicherheitsdenker, Acceleratoren und Kulturarchive. Wissenstransfer und strategische Analyse.",
    partners: [
      { name: "RUSI", role: "Mitglied", since: "Jan 2026", sinceDate: "2026-01", status: "membership", leader: "Karin von Hippel", leaderTitle: "Director-General", description: "Royal United Services Institute – ältester Sicherheits-Think-Tank.", integration: "Research Publications, Events", lat: 51.51, lng: -0.13, city: "London", country: "UK" },
      { name: "Ifri", role: "Mitglied", since: "Jan 2026", sinceDate: "2026-01", status: "membership", leader: "Thierry de Montbrial", leaderTitle: "Gründer & Präsident", description: "Französisches Institut für internationale Beziehungen.", integration: "Policy Research, Geopolitics", lat: 48.86, lng: 2.3, city: "Paris", country: "Frankreich" },
      { name: "RUSI NextGen", role: "Mitglied", since: "Jan 2026", sinceDate: "2026-01", status: "membership", leader: "RUSI Team", leaderTitle: "NextGen Programme", description: "Nachwuchsprogramm für aufstrebende Sicherheitsexperten.", integration: "NextGen Network, Mentorship", lat: 51.51, lng: -0.13, city: "London", country: "UK" },
      { name: "Eureka Network", role: "Experte", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Adel El Gammal", leaderTitle: "Secretary General", description: "Europäisches Netzwerk für marktnahe F&E-Kooperation.", integration: "Eurostars, Globalstars Programs", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
      { name: "NSF", role: "I-Corps Fellow", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Sethuraman Panchanathan", leaderTitle: "Director", description: "US National Science Foundation – Forschungsförderung.", integration: "I-Corps, SBIR/STTR Programs", lat: 38.88, lng: -77.02, city: "Alexandria", country: "USA" },
      { name: "500 Global", role: "Accelerator", since: "Feb 2025", sinceDate: "2025-02", status: "active", leader: "Christine Tsai", leaderTitle: "CEO", description: "Globaler Venture-Accelerator mit 2.700+ Portfolio-Unternehmen.", integration: "Accelerator Program, Seed Funding", lat: 37.39, lng: -122.08, city: "Silicon Valley", country: "USA" },
      { name: "KBR Belgium", role: "Archivverwalter", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Sara Lammens", leaderTitle: "Generaldirektorin", description: "Königliche Bibliothek von Belgien – nationales Kulturarchiv.", integration: "Digital Archives, Belgica Platform", lat: 50.85, lng: 4.36, city: "Brüssel", country: "Belgien" },
      { name: "Nat.Bib. Luxemburg", role: "Archivverwalter", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Monique Kieffer", leaderTitle: "Direktorin", description: "Nationalbibliothek Luxemburg – Kulturerbe-Bewahrung.", integration: "eluxemburgensia, Digital Collections", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },
      { name: "I.I.C. Parigi", role: "Archivverwalter", since: "Jan 2026", sinceDate: "2026-01", status: "active", leader: "Direzione IIC", leaderTitle: "Direktor", description: "Italienisches Kulturinstitut Paris – Kulturförderung.", integration: "Cultural Exchange Programs", lat: 48.86, lng: 2.3, city: "Paris", country: "Frankreich" },
    ],
  },
  {
    key: "dev",
    label: "Developer & Open Source",
    labelDe: "Developer & Open Source",
    icon: "🚀",
    description: "Open-Source-Ökosystem, Entwicklerplattformen, Identity/Security und Hackathon-Netzwerke. Community-driven Innovation.",
    partners: [
      { name: "GitHub", role: "Developer Program", since: "Okt 2024", sinceDate: "2024-10", status: "active", leader: "Thomas Dohmke", leaderTitle: "CEO", description: "Weltgrößte Entwicklerplattform mit 100M+ Entwicklern.", integration: "GitHub Actions, Copilot, Codespaces", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
      { name: "Linux Foundation", role: "LFX Mentor", since: "Sept 2025", sinceDate: "2025-09", status: "active", leader: "Jim Zemlin", leaderTitle: "Executive Director", description: "Nonprofit für Open-Source-Ökosystem und Linux-Kernel.", integration: "LFX Platform, CNCF, LF AI", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
      { name: "OpenSSF", role: "Best Practices", since: "Sept 2025", sinceDate: "2025-09", status: "active", leader: "Omkhar Arasaratnam", leaderTitle: "General Manager", description: "Open Source Security Foundation – Supply Chain Security.", integration: "Scorecard, SLSA, Sigstore", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
      { name: "Auth0", role: "Projektentwickler", since: "Sept 2025", sinceDate: "2025-09", status: "active", leader: "Jameeka Green Aaron", leaderTitle: "VP Engineering", description: "Identity-Plattform für sichere Authentifizierung.", integration: "Auth0 Universal Login, SDKs", lat: 47.62, lng: -122.34, city: "Seattle", country: "USA" },
      { name: "Frontegg", role: "Sys Integration", since: "Sept 2025", sinceDate: "2025-09", status: "active", leader: "Sagi Rodin", leaderTitle: "CEO", description: "User Management und Authentication für SaaS.", integration: "Frontegg SDK, SSO, RBAC", lat: 32.07, lng: 34.77, city: "Tel Aviv", country: "Israel" },
      { name: "MLH", role: "LCL Hackathon", since: "Feb 2026", sinceDate: "2026-02", status: "active", leader: "Mike Swift", leaderTitle: "CEO", description: "Major League Hacking – größtes Hackathon-Netzwerk.", integration: "MLH Events, Fellowship, Hackathons", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
      { name: "Prisma", role: "Consultant", since: "Okt 2025", sinceDate: "2025-10", status: "active", leader: "Søren Bramer Schmidt", leaderTitle: "CEO", description: "Next-Generation ORM für Node.js und TypeScript.", integration: "Prisma ORM, Prisma Accelerate", lat: 52.52, lng: 13.41, city: "Berlin", country: "Deutschland" },
    ],
  },
];

export const hubInfo = {
  name: "HNOSS",
  subtitle: "LCL – Love Crown Love",
  founder: "A.d.L. ST. Daniel Curil Indium Red Pohl",
  founderAlias: "Z3r0CL0cK",
  mission: "Bridging advanced infrastructure and human integrity",
  tagline: "Trust Trusted Thrust True Truely",
  location: { lat: 51.23, lng: 6.78, city: "NRW", country: "Deutschland" },
};

// Helper to get all partners across clusters as a flat list with cluster info
export function getAllPartnersFlat() {
  return clusters.flatMap(c => c.partners.map(p => ({ ...p, cluster: c.key, clusterLabel: c.label, clusterIcon: c.icon })));
}

// Timeline data sorted by date
export function getTimelineData() {
  const all = getAllPartnersFlat();
  return all.sort((a, b) => a.sinceDate.localeCompare(b.sinceDate));
}
