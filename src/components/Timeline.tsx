import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getTimelineData, type ClusterKey } from "@/data/ecosystemData";

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

const MONTH_LABELS: Record<string, string> = {
  "2024-09": "Sep 2024",
  "2024-10": "Okt 2024",
  "2025-02": "Feb 2025",
  "2025-03": "Mär 2025",
  "2025-05": "Mai 2025",
  "2025-07": "Jul 2025",
  "2025-08": "Aug 2025",
  "2025-09": "Sep 2025",
  "2025-10": "Okt 2025",
  "2025-12": "Dez 2025",
  "2026-01": "Jan 2026",
  "2026-02": "Feb 2026",
  "2026-03": "Mär 2026",
};

export default function Timeline() {
  const navigate = useNavigate();
  const data = getTimelineData();
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  // Group by sinceDate
  const grouped = data.reduce<Record<string, typeof data>>((acc, p) => {
    if (!acc[p.sinceDate]) acc[p.sinceDate] = [];
    acc[p.sinceDate].push(p);
    return acc;
  }, {});

  const months = Object.keys(grouped).sort();

  return (
    <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-2">
          Chronologie
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Partner-Timeline
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Wann welche Partnerschaften begonnen haben
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

        {months.map((month, mi) => {
          const partners = grouped[month];
          const isLeft = mi % 2 === 0;
          const isExpanded = expandedMonth === month;

          return (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: mi * 0.05 }}
              className={`relative mb-8 flex items-start ${
                "md:flex-row"
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1/2 mt-5 z-10"
              />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[45%] ${
                  isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <button
                  onClick={() => setExpandedMonth(isExpanded ? null : month)}
                  className="w-full text-left"
                >
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary font-mono text-sm font-bold">
                        {MONTH_LABELS[month] || month}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-0.5 rounded">
                        {partners.length} Partner
                      </span>
                    </div>

                    {/* Preview chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {(isExpanded ? partners : partners.slice(0, 4)).map((p) => (
                        <span
                          key={`${p.name}-${p.cluster}`}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border cursor-pointer hover:scale-105 transition-transform ${CLUSTER_TEXT[p.cluster]}`}
                          style={{
                            backgroundColor: `hsl(${CLUSTER_COLORS[p.cluster]} / 0.08)`,
                            borderColor: `hsl(${CLUSTER_COLORS[p.cluster]} / 0.2)`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cluster/${p.cluster}`);
                          }}
                        >
                          {p.clusterIcon} {p.name}
                        </span>
                      ))}
                      {!isExpanded && partners.length > 4 && (
                        <span className="text-[11px] text-muted-foreground px-2 py-0.5">
                          +{partners.length - 4} weitere
                        </span>
                      )}
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-border/50 space-y-2"
                      >
                        {partners.map((p) => (
                          <div
                            key={`detail-${p.name}-${p.cluster}`}
                            className="flex items-start gap-2 text-xs cursor-pointer hover:bg-secondary/30 rounded p-1.5 -mx-1.5 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/cluster/${p.cluster}`);
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                              style={{ backgroundColor: `hsl(${CLUSTER_COLORS[p.cluster]})` }}
                            />
                            <div>
                              <span className={`font-semibold ${CLUSTER_TEXT[p.cluster]}`}>{p.name}</span>
                              <span className="text-muted-foreground"> — {p.role}</span>
                              {p.leader && (
                                <p className="text-muted-foreground/70 mt-0.5">
                                  {p.leaderTitle}: {p.leader}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
