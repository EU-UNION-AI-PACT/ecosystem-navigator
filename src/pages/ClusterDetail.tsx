import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Users, Calendar, Link2, MapPin } from "lucide-react";
import { clusters, type ClusterKey } from "@/data/ecosystemData";

const CLUSTER_COLORS: Record<ClusterKey, string> = {
  infra: "var(--cluster-infra)",
  finance: "var(--cluster-finance)",
  tech: "var(--cluster-tech)",
  governance: "var(--cluster-governance)",
  research: "var(--cluster-research)",
  dev: "var(--cluster-dev)",
};

const CLUSTER_TEXT: Record<ClusterKey, string> = {
  infra: "text-cluster-infra",
  finance: "text-cluster-finance",
  tech: "text-cluster-tech",
  governance: "text-cluster-governance",
  research: "text-cluster-research",
  dev: "text-cluster-dev",
};

const STATUS_LABELS: Record<string, { label: string; dot: string }> = {
  active: { label: "Active Partner", dot: "bg-emerald-400" },
  review: { label: "In Review", dot: "bg-amber-400" },
  membership: { label: "Membership", dot: "bg-blue-400" },
};

export default function ClusterDetail() {
  const { clusterId } = useParams<{ clusterId: string }>();
  const navigate = useNavigate();

  const cluster = clusters.find((c) => c.key === clusterId);
  if (!cluster) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Cluster nicht gefunden</h1>
          <button onClick={() => navigate("/")} className="text-primary mt-4 underline">
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  const activeCount = cluster.partners.filter((p) => p.status === "active").length;
  const reviewCount = cluster.partners.filter((p) => p.status === "review").length;
  const memberCount = cluster.partners.filter((p) => p.status === "membership").length;
  const countries = [...new Set(cluster.partners.map((p) => p.country).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative border-b border-border bg-card/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Ecosystem Map
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{cluster.icon}</span>
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold ${CLUSTER_TEXT[cluster.key]}`}>
                  {cluster.label}
                </h1>
                <p className="text-muted-foreground text-sm">{cluster.labelDe}</p>
              </div>
            </div>
            <p className="text-foreground/80 max-w-2xl mt-2">{cluster.description}</p>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono font-bold text-primary">{cluster.partners.length}</span>
              <span className="text-xs text-muted-foreground">Partner</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-mono font-bold text-foreground">{activeCount}</span>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            {reviewCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm font-mono font-bold text-foreground">{reviewCount}</span>
                <span className="text-xs text-muted-foreground">Review</span>
              </div>
            )}
            {memberCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm font-mono font-bold text-foreground">{memberCount}</span>
                <span className="text-xs text-muted-foreground">Memberships</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono font-bold text-foreground">{countries.length}</span>
              <span className="text-xs text-muted-foreground">Länder</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Partner Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cluster.partners.map((partner, i) => {
            const status = STATUS_LABELS[partner.status || "active"];
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/20 transition-all group"
                style={{
                  borderTopColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.4)`,
                  borderTopWidth: 2,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-bold text-lg ${CLUSTER_TEXT[cluster.key]}`}>
                      {partner.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">{partner.role}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                    <span className="text-[10px] text-muted-foreground font-mono">{status.label}</span>
                  </div>
                </div>

                {/* Description */}
                {partner.description && (
                  <p className="text-sm text-foreground/70 mb-3 leading-relaxed">
                    {partner.description}
                  </p>
                )}

                {/* Leader */}
                {partner.leader && (
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground/60">
                      {partner.leader.charAt(0)}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{partner.leader}</span>
                      <span className="text-muted-foreground"> · {partner.leaderTitle}</span>
                    </div>
                  </div>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
                  {partner.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {partner.city}, {partner.country}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    seit {partner.since}
                  </span>
                  {partner.lat && partner.lng && (
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Globe className="w-3 h-3" />
                      {partner.lat.toFixed(2)}°, {partner.lng.toFixed(2)}°
                    </span>
                  )}
                </div>

                {/* Integration */}
                {partner.integration && (
                  <div className="mt-3 pt-2 border-t border-border/30">
                    <div className="flex items-center gap-1 mb-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                      <Link2 className="w-3 h-3" />
                      Integration
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {partner.integration.split(", ").map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono border"
                          style={{
                            backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.06)`,
                            borderColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.15)`,
                            color: `hsl(${CLUSTER_COLORS[cluster.key]})`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
