import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoPartners, hubLocation, geoToSvg, regionStats, type GeoPartner } from "@/data/geoData";
import { type ClusterKey } from "@/data/ecosystemData";

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

const CLUSTER_LABELS: Record<ClusterKey, string> = {
  infra: "Infrastructure",
  finance: "Finance",
  tech: "Technology",
  governance: "Governance",
  research: "Research",
  dev: "Developer",
};

// Simplified world map continent paths (Mercator-ish projection, viewBox 0 0 1000 500)
const CONTINENT_PATHS = [
  // North America
  "M120,50 L160,45 L190,55 L220,60 L250,70 L270,90 L280,110 L275,130 L260,150 L250,170 L240,190 L230,200 L220,195 L200,190 L180,180 L160,170 L140,160 L130,150 L120,135 L115,120 L110,100 L112,80 L115,65 Z",
  // Central America
  "M180,195 L200,200 L215,210 L220,220 L215,230 L205,235 L195,230 L185,220 L180,210 Z",
  // South America
  "M230,240 L250,235 L270,240 L290,250 L305,270 L310,300 L305,330 L295,355 L280,370 L265,375 L250,365 L240,345 L235,320 L230,295 L225,270 L228,250 Z",
  // Europe
  "M460,55 L480,50 L500,52 L520,58 L530,65 L535,80 L530,95 L520,105 L510,110 L500,115 L490,112 L480,108 L470,100 L465,90 L460,80 L458,70 Z",
  // Africa
  "M460,150 L480,145 L500,148 L520,155 L535,170 L540,190 L540,220 L535,250 L525,280 L510,300 L495,310 L480,305 L470,290 L460,270 L455,245 L452,220 L453,195 L455,170 Z",
  // Middle East
  "M540,100 L560,95 L580,100 L590,115 L585,130 L575,140 L560,145 L545,140 L535,130 L530,115 L535,105 Z",
  // Russia / Central Asia
  "M530,35 L580,30 L640,28 L700,30 L750,35 L780,45 L790,60 L780,75 L760,85 L730,90 L700,88 L660,82 L620,78 L580,72 L550,65 L535,55 Z",
  // South Asia / India
  "M600,140 L630,130 L650,140 L660,160 L655,180 L640,195 L620,200 L605,195 L595,180 L590,160 Z",
  // East Asia
  "M700,70 L730,65 L760,70 L780,80 L790,100 L785,120 L775,135 L760,145 L740,148 L720,145 L705,135 L695,120 L690,100 L692,85 Z",
  // Southeast Asia
  "M720,170 L740,165 L760,170 L770,180 L765,195 L750,205 L735,210 L720,205 L715,190 Z",
  // Australia
  "M760,280 L790,270 L830,275 L855,285 L860,305 L850,325 L830,335 L800,338 L775,330 L760,315 L755,295 Z",
  // Japan / Korea
  "M800,80 L810,75 L820,80 L825,95 L820,110 L810,118 L800,115 L795,100 L798,88 Z",
];

interface TooltipInfo {
  partner: GeoPartner;
  svgX: number;
  svgY: number;
}

export default function WorldMap() {
  const [activeCluster, setActiveCluster] = useState<ClusterKey | null>(null);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const hubSvg = geoToSvg(hubLocation.lat, hubLocation.lng);

  // Deduplicate overlapping markers by grouping nearby partners
  const groupedPartners = useMemo(() => {
    const filtered = activeCluster
      ? geoPartners.filter((p) => p.cluster === activeCluster)
      : geoPartners;

    const groups: { partners: GeoPartner[]; x: number; y: number }[] = [];
    filtered.forEach((p) => {
      const pos = geoToSvg(p.lat, p.lng);
      const existing = groups.find(
        (g) => Math.abs(g.x - pos.x) < 8 && Math.abs(g.y - pos.y) < 8
      );
      if (existing) {
        existing.partners.push(p);
      } else {
        groups.push({ partners: [p], x: pos.x, y: pos.y });
      }
    });
    return groups;
  }, [activeCluster]);

  const handleTooltipEnter = (group: { partners: GeoPartner[]; x: number; y: number }) => {
    setTooltip({ partner: group.partners[0], svgX: group.x, svgY: group.y });
  };

  return (
    <section className="relative z-10 px-6 pb-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-2">
          Globale Präsenz
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Partner-Weltkarte
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
          {geoPartners.length} Partner in {regionStats.filter(r => r.count > 0).length} Regionen weltweit
        </p>
      </motion.div>

      {/* Region stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        {regionStats.filter(r => r.count > 0).map((r) => (
          <div
            key={r.region}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border"
          >
            <span className="text-lg">{r.emoji}</span>
            <span className="text-sm text-foreground font-medium">{r.region}</span>
            <span className="text-xs text-primary font-mono font-bold">{r.count}</span>
          </div>
        ))}
      </motion.div>

      {/* Cluster filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCluster(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
            activeCluster === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          Alle
        </button>
        {(Object.keys(CLUSTER_LABELS) as ClusterKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveCluster(activeCluster === key ? null : key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              activeCluster === key
                ? `${CLUSTER_TEXT[key]} border-current`
                : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
            }`}
            style={
              activeCluster === key
                ? { backgroundColor: `hsl(${CLUSTER_COLORS[key]} / 0.15)` }
                : {}
            }
          >
            {CLUSTER_LABELS[key]}
          </button>
        ))}
      </div>

      {/* World map SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-5xl mx-auto rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden relative"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="hsl(220 15% 12%)"
                strokeWidth="0.5"
              />
            </pattern>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hubGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1000" height="500" fill="url(#grid)" />

          {/* Continents */}
          {CONTINENT_PATHS.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="hsl(220 15% 10%)"
              stroke="hsl(220 15% 18%)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            />
          ))}

          {/* Connection lines from hub to partner groups */}
          {groupedPartners.map((group, i) => (
            <motion.line
              key={`line-${i}`}
              x1={hubSvg.x}
              y1={hubSvg.y}
              x2={group.x}
              y2={group.y}
              stroke={`hsl(${CLUSTER_COLORS[group.partners[0].cluster]} / 0.12)`}
              strokeWidth="0.8"
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.02, duration: 0.6 }}
            />
          ))}

          {/* Hub marker */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <circle
              cx={hubSvg.x}
              cy={hubSvg.y}
              r="8"
              fill="hsl(var(--primary))"
              filter="url(#hubGlow)"
            >
              <animate
                attributeName="r"
                values="7;10;7"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={hubSvg.x}
              cy={hubSvg.y}
              r="16"
              fill="none"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                values="14;22;14"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={hubSvg.x}
              y={hubSvg.y - 16}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              fontSize="7"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
            >
              HNOSS HQ
            </text>
          </motion.g>

          {/* Partner markers */}
          {groupedPartners.map((group, i) => {
            const cluster = group.partners[0].cluster;
            const isMulti = group.partners.length > 1;

            return (
              <motion.g
                key={`marker-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.02, type: "spring" }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleTooltipEnter(group)}
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Outer glow ring */}
                <circle
                  cx={group.x}
                  cy={group.y}
                  r={isMulti ? 7 : 5}
                  fill={`hsl(${CLUSTER_COLORS[cluster]} / 0.15)`}
                  stroke={`hsl(${CLUSTER_COLORS[cluster]} / 0.4)`}
                  strokeWidth="0.8"
                />
                {/* Inner dot */}
                <circle
                  cx={group.x}
                  cy={group.y}
                  r={isMulti ? 4 : 3}
                  fill={`hsl(${CLUSTER_COLORS[cluster]})`}
                  filter="url(#glow)"
                />
                {/* Count badge for multi */}
                {isMulti && (
                  <>
                    <circle
                      cx={group.x + 6}
                      cy={group.y - 5}
                      r="5"
                      fill="hsl(var(--card))"
                      stroke={`hsl(${CLUSTER_COLORS[cluster]})`}
                      strokeWidth="0.8"
                    />
                    <text
                      x={group.x + 6}
                      y={group.y - 3}
                      textAnchor="middle"
                      fill={`hsl(${CLUSTER_COLORS[cluster]})`}
                      fontSize="5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {group.partners.length}
                    </text>
                  </>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Tooltip overlay */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute z-50 bg-popover border border-border rounded-lg px-4 py-3 shadow-2xl pointer-events-none max-w-[240px]"
              style={{
                left: `${(tooltip.svgX / 1000) * 100}%`,
                top: `${(tooltip.svgY / 500) * 100 - 2}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              {/* Show all partners at this location */}
              {(() => {
                const group = groupedPartners.find(
                  (g) =>
                    Math.abs(g.x - tooltip.svgX) < 1 &&
                    Math.abs(g.y - tooltip.svgY) < 1
                );
                const partners = group?.partners || [tooltip.partner];
                return (
                  <>
                    <p className="text-[10px] text-muted-foreground font-mono mb-1">
                      📍 {tooltip.partner.city}, {tooltip.partner.country}
                    </p>
                    <div className="space-y-1">
                      {partners.slice(0, 6).map((p) => (
                        <div key={p.name} className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: `hsl(${CLUSTER_COLORS[p.cluster]})` }}
                          />
                          <span className={`text-xs font-medium ${CLUSTER_TEXT[p.cluster]}`}>
                            {p.name}
                          </span>
                        </div>
                      ))}
                      {partners.length > 6 && (
                        <p className="text-[10px] text-muted-foreground">
                          +{partners.length - 6} weitere
                        </p>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
