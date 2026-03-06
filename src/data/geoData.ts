import { type ClusterKey } from "./ecosystemData";

export interface GeoPartner {
  name: string;
  cluster: ClusterKey;
  lat: number;
  lng: number;
  city?: string;
  country: string;
}

export interface GeoRegion {
  key: string;
  label: string;
  partners: GeoPartner[];
  color: ClusterKey;
}

// Mercator projection helper: convert lat/lng to SVG coordinates
// Using Natural Earth-style bounds: lng [-180, 180] → x [0, 1000], lat [80, -60] → y [0, 500]
export function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((80 - lat) / 140) * 500;
  return { x, y };
}

export const geoPartners: GeoPartner[] = [
  // === Infrastructure & Cloud ===
  { name: "Megaport", cluster: "infra", lat: -33.87, lng: 151.21, city: "Sydney", country: "Australien" },
  { name: "PacketFabric", cluster: "infra", lat: 37.77, lng: -122.42, city: "San Francisco", country: "USA" },
  { name: "BSO", cluster: "infra", lat: 51.51, lng: -0.13, city: "London", country: "UK" },
  { name: "Equinix", cluster: "infra", lat: 37.39, lng: -122.08, city: "Silicon Valley", country: "USA" },
  { name: "Console Connect", cluster: "infra", lat: 22.32, lng: 114.17, city: "Hong Kong", country: "China" },
  { name: "PeeringDB", cluster: "infra", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
  { name: "PCCW Global", cluster: "infra", lat: 22.32, lng: 114.17, city: "Hong Kong", country: "China" },

  // === Finance & Payment ===
  { name: "Visa", cluster: "finance", lat: 37.39, lng: -122.15, city: "Foster City", country: "USA" },
  { name: "Mastercard", cluster: "finance", lat: 41.07, lng: -73.77, city: "Purchase", country: "USA" },
  { name: "American Express", cluster: "finance", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
  { name: "PayPal", cluster: "finance", lat: 37.25, lng: -121.93, city: "San Jose", country: "USA" },
  { name: "Deutsche Bank", cluster: "finance", lat: 50.11, lng: 8.68, city: "Frankfurt", country: "Deutschland" },
  { name: "ING", cluster: "finance", lat: 52.37, lng: 4.9, city: "Amsterdam", country: "Niederlande" },
  { name: "IMF", cluster: "finance", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },
  { name: "EIF", cluster: "finance", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },
  { name: "EIB", cluster: "finance", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },
  { name: "World Bank", cluster: "finance", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },
  { name: "Deutsche Börse", cluster: "finance", lat: 50.11, lng: 8.68, city: "Frankfurt", country: "Deutschland" },
  { name: "SIX Swiss Exchange", cluster: "finance", lat: 47.38, lng: 8.54, city: "Zürich", country: "Schweiz" },
  { name: "FINRA", cluster: "finance", lat: 38.9, lng: -77.04, city: "Washington D.C.", country: "USA" },

  // === Technology & Hardware ===
  { name: "Apple", cluster: "tech", lat: 37.33, lng: -122.01, city: "Cupertino", country: "USA" },
  { name: "Intel", cluster: "tech", lat: 37.39, lng: -121.96, city: "Santa Clara", country: "USA" },
  { name: "AMD", cluster: "tech", lat: 37.38, lng: -121.97, city: "Santa Clara", country: "USA" },
  { name: "HP", cluster: "tech", lat: 37.41, lng: -122.14, city: "Palo Alto", country: "USA" },
  { name: "MSI", cluster: "tech", lat: 25.03, lng: 121.57, city: "Taipei", country: "Taiwan" },
  { name: "Ericsson", cluster: "tech", lat: 59.33, lng: 18.07, city: "Stockholm", country: "Schweden" },
  { name: "Motorola", cluster: "tech", lat: 42.07, lng: -87.94, city: "Chicago", country: "USA" },
  { name: "Microsoft", cluster: "tech", lat: 47.64, lng: -122.13, city: "Redmond", country: "USA" },
  { name: "Google", cluster: "tech", lat: 37.42, lng: -122.08, city: "Mountain View", country: "USA" },
  { name: "AWS", cluster: "tech", lat: 47.62, lng: -122.34, city: "Seattle", country: "USA" },
  { name: "IBM", cluster: "tech", lat: 41.11, lng: -73.72, city: "Armonk", country: "USA" },
  { name: "SAP", cluster: "tech", lat: 49.29, lng: 8.64, city: "Walldorf", country: "Deutschland" },
  { name: "Oracle", cluster: "tech", lat: 36.62, lng: -121.92, city: "Austin", country: "USA" },

  // === Global Governance ===
  { name: "United Nations", cluster: "governance", lat: 40.75, lng: -73.97, city: "New York", country: "USA" },
  { name: "UNICEF", cluster: "governance", lat: 40.75, lng: -73.97, city: "New York", country: "USA" },
  { name: "UNESCO", cluster: "governance", lat: 48.85, lng: 2.31, city: "Paris", country: "Frankreich" },
  { name: "WHO", cluster: "governance", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
  { name: "WTO", cluster: "governance", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
  { name: "UN-Habitat", cluster: "governance", lat: -1.29, lng: 36.82, city: "Nairobi", country: "Kenia" },
  { name: "UNEP", cluster: "governance", lat: -1.29, lng: 36.82, city: "Nairobi", country: "Kenia" },
  { name: "UNCTAD", cluster: "governance", lat: 46.23, lng: 6.15, city: "Genf", country: "Schweiz" },
  { name: "NATO", cluster: "governance", lat: 50.88, lng: 4.42, city: "Brüssel", country: "Belgien" },
  { name: "EU Commission", cluster: "governance", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
  { name: "EBA", cluster: "governance", lat: 48.86, lng: 2.35, city: "Paris", country: "Frankreich" },
  { name: "EUIPO", cluster: "governance", lat: 38.35, lng: -0.49, city: "Alicante", country: "Spanien" },
  { name: "EU Patent Office", cluster: "governance", lat: 48.14, lng: 11.58, city: "München", country: "Deutschland" },
  { name: "Council of EU", cluster: "governance", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
  { name: "CTBTO", cluster: "governance", lat: 48.21, lng: 16.37, city: "Wien", country: "Österreich" },

  // === Research & Think Tanks ===
  { name: "RUSI", cluster: "research", lat: 51.51, lng: -0.13, city: "London", country: "UK" },
  { name: "Ifri", cluster: "research", lat: 48.86, lng: 2.3, city: "Paris", country: "Frankreich" },
  { name: "Eureka Network", cluster: "research", lat: 50.84, lng: 4.38, city: "Brüssel", country: "Belgien" },
  { name: "NSF", cluster: "research", lat: 38.88, lng: -77.02, city: "Alexandria", country: "USA" },
  { name: "500 Global", cluster: "research", lat: 37.39, lng: -122.08, city: "Silicon Valley", country: "USA" },
  { name: "KBR Belgium", cluster: "research", lat: 50.85, lng: 4.36, city: "Brüssel", country: "Belgien" },
  { name: "Nat.Bib. Luxemburg", cluster: "research", lat: 49.61, lng: 6.13, city: "Luxemburg", country: "Luxemburg" },

  // === Developer & Open Source ===
  { name: "GitHub", cluster: "dev", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
  { name: "Linux Foundation", cluster: "dev", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
  { name: "OpenSSF", cluster: "dev", lat: 37.78, lng: -122.39, city: "San Francisco", country: "USA" },
  { name: "Auth0", cluster: "dev", lat: 47.62, lng: -122.34, city: "Seattle", country: "USA" },
  { name: "Frontegg", cluster: "dev", lat: 32.07, lng: 34.77, city: "Tel Aviv", country: "Israel" },
  { name: "MLH", cluster: "dev", lat: 40.71, lng: -74.01, city: "New York", country: "USA" },
  { name: "Prisma", cluster: "dev", lat: 52.52, lng: 13.41, city: "Berlin", country: "Deutschland" },
];

// Hub location (NRW, Germany)
export const hubLocation = { lat: 51.23, lng: 6.78, city: "NRW", country: "Deutschland" };

// Group by region for stats
export const regionStats = [
  { region: "Nordamerika", emoji: "🇺🇸", count: geoPartners.filter(p => p.country === "USA").length },
  { region: "Europa", emoji: "🇪🇺", count: geoPartners.filter(p => ["Deutschland", "UK", "Frankreich", "Belgien", "Niederlande", "Luxemburg", "Schweiz", "Schweden", "Österreich", "Spanien"].includes(p.country)).length },
  { region: "Asien-Pazifik", emoji: "🌏", count: geoPartners.filter(p => ["China", "Taiwan", "Australien", "Israel"].includes(p.country)).length },
  { region: "Afrika", emoji: "🌍", count: geoPartners.filter(p => p.country === "Kenia").length },
];
