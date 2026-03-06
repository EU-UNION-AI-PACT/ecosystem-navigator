import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clusters, hubInfo, type ClusterKey, type Partner } from "@/data/ecosystemData";

const CLUSTER_COLORS: Record<ClusterKey, string> = {
  infra: "var(--cluster-infra)",
  finance: "var(--cluster-finance)",
  tech: "var(--cluster-tech)",
  governance: "var(--cluster-governance)",
  research: "var(--cluster-research)",
  dev: "var(--cluster-dev)",
};

const CLUSTER_BG: Record<ClusterKey, string> = {
  infra: "bg-cluster-infra",
  finance: "bg-cluster-finance",
  tech: "bg-cluster-tech",
  governance: "bg-cluster-governance",
  research: "bg-cluster-research",
  dev: "bg-cluster-dev",
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
  active: { label: "Active", dot: "bg-emerald-400" },
  review: { label: "In Review", dot: "bg-amber-400" },
  membership: { label: "Membership", dot: "bg-blue-400" },
};

interface TooltipData {
  partner: Partner;
  cluster: ClusterKey;
  x: number;
  y: number;
}

export default function EcosystemMap() {
  const [activeCluster, setActiveCluster] = useState<ClusterKey | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPartners = useMemo(
    () => clusters.reduce((acc, c) => acc + c.partners.length, 0),
    []
  );

  const filteredClusters = useMemo(() => {
    if (!searchQuery) return clusters;
    const q = searchQuery.toLowerCase();
    return clusters.map((c) => ({
      ...c,
      partners: c.partners.filter((p) =>
        p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
      ),
    })).filter((c) => c.partners.length > 0);
  }, [searchQuery]);

  const displayClusters = searchQuery ? filteredClusters : clusters;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cluster-governance/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-2">
            Global Deep-Tech & Ethical Innovation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Ecosystem Map
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {hubInfo.mission} — <span className="text-primary font-medium">{totalPartners} Partner</span> in {clusters.length} Clustern
          </p>
        </motion.div>
      </header>

      {/* Search */}
      <div className="relative z-10 flex justify-center px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Partner suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm backdrop-blur-sm"
          />
        </motion.div>
      </div>

      {/* Cluster filter pills */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 px-6 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setActiveCluster(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
            activeCluster === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          Alle
        </motion.button>
        {clusters.map((c, i) => (
          <motion.button
            key={c.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            onClick={() => setActiveCluster(activeCluster === c.key ? null : c.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              activeCluster === c.key
                ? `border-current ${CLUSTER_TEXT[c.key]}`
                : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
            }`}
            style={activeCluster === c.key ? { backgroundColor: `hsl(${CLUSTER_COLORS[c.key]} / 0.15)` } : {}}
          >
            {c.icon} {c.label}
          </motion.button>
        ))}
      </div>

      {/* Radial Map (desktop) + List (mobile) */}
      <div className="relative z-10 px-6 pb-16">
        {/* Desktop radial view */}
        <div className="hidden lg:flex justify-center">
          <div className="relative w-[900px] h-[900px]">
            {/* Orbit rings */}
            {[200, 320, 440].map((r, i) => (
              <div
                key={r}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30"
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}

            {/* Center hub */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-card border-2 border-primary flex flex-col items-center justify-center hub-glow cursor-pointer z-20"
            >
              <span className="text-2xl font-bold text-primary">{hubInfo.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono mt-1">LCL</span>
            </motion.div>

            {/* Partner nodes arranged radially per cluster */}
            {displayClusters.map((cluster, ci) => {
              if (activeCluster && activeCluster !== cluster.key) return null;
              const angleOffset = (ci / clusters.length) * Math.PI * 2 - Math.PI / 2;
              const sectorWidth = (Math.PI * 2) / (activeCluster ? 1 : clusters.length);

              return cluster.partners.map((partner, pi) => {
                const ringIndex = pi < 5 ? 0 : pi < 10 ? 1 : 2;
                const radius = [200, 320, 440][ringIndex];
                const partnersInRing = cluster.partners.filter(
                  (_, idx) => (idx < 5 ? 0 : idx < 10 ? 1 : 2) === ringIndex
                );
                const idxInRing = partnersInRing.indexOf(partner);
                const subAngle = activeCluster
                  ? ((pi / cluster.partners.length) * Math.PI * 2) - Math.PI / 2
                  : angleOffset + ((idxInRing + 0.5) / partnersInRing.length) * sectorWidth;

                const x = 450 + Math.cos(subAngle) * radius;
                const y = 450 + Math.sin(subAngle) * radius;

                return (
                  <motion.div
                    key={`${cluster.key}-${partner.name}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + pi * 0.03, type: "spring" }}
                    className="absolute z-10 group"
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        partner,
                        cluster: cluster.key,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {/* Connection line */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: 1,
                        height: 1,
                        overflow: "visible",
                      }}
                    >
                      <line
                        x1={0}
                        y1={0}
                        x2={450 - x}
                        y2={450 - y}
                        stroke={`hsl(${CLUSTER_COLORS[cluster.key]} / 0.15)`}
                        strokeWidth={1}
                        strokeDasharray={partner.status === "membership" ? "4 4" : partner.status === "review" ? "8 4" : "none"}
                      />
                    </svg>

                    <div
                      className={`relative px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all backdrop-blur-sm ${
                        CLUSTER_TEXT[cluster.key]
                      } hover:scale-110`}
                      style={{
                        backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.08)`,
                        borderColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.25)`,
                      }}
                    >
                      <span className="whitespace-nowrap">{partner.name}</span>
                    </div>
                  </motion.div>
                );
              });
            })}

            {/* Cluster labels */}
            {displayClusters.map((cluster, ci) => {
              if (activeCluster && activeCluster !== cluster.key) return null;
              const angle = activeCluster
                ? -Math.PI / 2
                : (ci / clusters.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / clusters.length;
              const x = 450 + Math.cos(angle) * 140;
              const y = 450 + Math.sin(angle) * 140;

              return (
                <motion.div
                  key={`label-${cluster.key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`absolute z-30 text-[10px] font-mono uppercase tracking-wider ${CLUSTER_TEXT[cluster.key]}`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {cluster.icon} {cluster.label}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile card/list view */}
        <div className="lg:hidden space-y-6 max-w-2xl mx-auto">
          {/* Center hub mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary flex flex-col items-center justify-center hub-glow">
              <span className="text-xl font-bold text-primary">{hubInfo.name}</span>
              <span className="text-[9px] text-muted-foreground font-mono">LCL</span>
            </div>
            <p className="text-muted-foreground text-xs mt-2 italic">"{hubInfo.tagline}"</p>
          </motion.div>

          {displayClusters.map((cluster, ci) => {
            if (activeCluster && activeCluster !== cluster.key) return null;
            return (
              <motion.div
                key={cluster.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
                style={{ borderLeftColor: `hsl(${CLUSTER_COLORS[cluster.key]})`, borderLeftWidth: 3 }}
              >
                <div className="px-4 py-3 flex items-center gap-2 border-b border-border/50">
                  <span className="text-lg">{cluster.icon}</span>
                  <h3 className={`font-semibold text-sm ${CLUSTER_TEXT[cluster.key]}`}>
                    {cluster.label}
                  </h3>
                  <span className="ml-auto text-xs text-muted-foreground font-mono">
                    {cluster.partners.length}
                  </span>
                </div>
                <div className="p-3 flex flex-wrap gap-2">
                  {cluster.partners.map((p) => (
                    <span
                      key={p.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${CLUSTER_TEXT[cluster.key]}`}
                      style={{
                        backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.08)`,
                        borderColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.2)`,
                      }}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_LABELS[p.status || "active"].dot}`}
                      />
                      {p.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 fixed bottom-6 right-6 bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 text-[10px] font-mono space-y-1.5"
      >
        <p className="text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Legende</p>
        {Object.entries(STATUS_LABELS).map(([key, { label, dot }]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <span className="text-foreground/70">{label}</span>
          </div>
        ))}
        <div className="border-t border-border/50 pt-1.5 mt-2 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-foreground/30" />
            <span className="text-foreground/70">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-foreground/30 border-dashed border-b" style={{ borderStyle: "dashed" }} />
            <span className="text-foreground/70">Membership</span>
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 bg-popover border border-border rounded-lg px-4 py-3 shadow-xl pointer-events-none max-w-[200px]"
            style={{
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className={`font-semibold text-sm ${CLUSTER_TEXT[tooltip.cluster]}`}>
              {tooltip.partner.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{tooltip.partner.role}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  STATUS_LABELS[tooltip.partner.status || "active"].dot
                }`}
              />
              <span className="text-[10px] text-foreground/60 font-mono">
                {STATUS_LABELS[tooltip.partner.status || "active"].label} · seit {tooltip.partner.since}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
