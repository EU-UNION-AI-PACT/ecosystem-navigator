import EcosystemMap from "@/components/EcosystemMap";
import Globe3D from "@/components/Globe3D";
import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { clusters, type ClusterKey } from "@/data/ecosystemData";

const CLUSTER_TEXT: Record<ClusterKey, string> = {
  infra: "text-cluster-infra",
  finance: "text-cluster-finance",
  tech: "text-cluster-tech",
  governance: "text-cluster-governance",
  research: "text-cluster-research",
  dev: "text-cluster-dev",
};

const CLUSTER_COLORS: Record<ClusterKey, string> = {
  infra: "var(--cluster-infra)",
  finance: "var(--cluster-finance)",
  tech: "var(--cluster-tech)",
  governance: "var(--cluster-governance)",
  research: "var(--cluster-research)",
  dev: "var(--cluster-dev)",
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      <EcosystemMap />

      {/* Cluster Cards for Drill-Down */}
      <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-2">
            Deep Dive
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Cluster erkunden
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Klicke auf einen Cluster für detaillierte Partner-Profile und Metriken
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((c, i) => {
            const countries = [...new Set(c.partners.map(p => p.country).filter(Boolean))];
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/cluster/${c.key}`)}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all group"
                style={{
                  borderTopColor: `hsl(${CLUSTER_COLORS[c.key]} / 0.5)`,
                  borderTopWidth: 2,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <h3 className={`font-bold text-lg ${CLUSTER_TEXT[c.key]} group-hover:underline`}>
                      {c.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">{c.labelDe}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span className={`font-bold ${CLUSTER_TEXT[c.key]}`}>{c.partners.length} Partner</span>
                  <span>{countries.length} Länder</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {c.partners.slice(0, 5).map(p => (
                    <span key={p.name} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground">
                      {p.name}
                    </span>
                  ))}
                  {c.partners.length > 5 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-muted-foreground">
                      +{c.partners.length - 5}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Globe3D />
      <Timeline />
    </div>
  );
};

export default Index;
