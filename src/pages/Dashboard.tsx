import React from "react";
import { motion } from "framer-motion";
import { clusters } from "@/data/ecosystemData";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function AnimatedCounter({ value, label, color }: { value: number; label: string; color: string }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1200;
    const increment = end / (duration / 16);
    let raf: number;
    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(end);
        cancelAnimationFrame(raf);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [value]);
  // Cluster color class mapping
  const colorClass = label.toLowerCase().includes("infra") ? "text-cluster-infra" :
    label.toLowerCase().includes("finance") ? "text-cluster-finance" :
    label.toLowerCase().includes("tech") ? "text-cluster-tech" :
    label.toLowerCase().includes("governance") ? "text-cluster-governance" :
    label.toLowerCase().includes("research") ? "text-cluster-research" :
    label.toLowerCase().includes("dev") ? "text-cluster-dev" : "text-foreground";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
      <span className={`text-3xl font-bold dashboard-counter ${colorClass}`}>{count}</span>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </motion.div>
  );
}

export default function Dashboard() {
  // Cluster-Statistik
  const clusterStats = clusters.map(c => ({
    key: c.key,
    label: c.label,
    color: `hsl(var(--cluster-${c.key}))`,
    partnerCount: c.partners.length,
    countries: Array.from(new Set(c.partners.map(p => p.country).filter(Boolean))),
  }));

  // Pie Chart Daten
  const pieData = {
    labels: clusterStats.map(c => c.label),
    datasets: [
      {
        data: clusterStats.map(c => c.partnerCount),
        backgroundColor: clusterStats.map(c => c.color),
        borderWidth: 1,
      },
    ],
  };

  // Cluster-Vergleich
  const maxCluster = clusterStats.reduce((max, c) => c.partnerCount > max.partnerCount ? c : max, clusterStats[0]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
        Statistik-Dashboard
      </motion.h2>
      {/* Zahlen-Counter */}
      <div className="flex gap-8 mb-10">
        {clusterStats.map(c => (
          <AnimatedCounter key={c.key} value={c.partnerCount} label={c.label} color={c.color} />
        ))}
      </div>
      {/* Tortendiagramm */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-10">
        <Pie data={pieData} options={{ plugins: { legend: { position: "bottom" } } }} />
      </motion.div>
      {/* Cluster-Vergleich */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="bg-card p-6 rounded-xl border border-border shadow">
          <h3 className="text-lg font-bold mb-2">Cluster mit den meisten Partnern</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{maxCluster.label}</span>
            <span className="text-primary font-mono text-xl">{maxCluster.partnerCount}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
