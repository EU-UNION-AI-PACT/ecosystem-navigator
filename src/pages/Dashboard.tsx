<<<<<<< HEAD
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
=======
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowLeft, TrendingUp, Globe, Users, Building2, Layers } from "lucide-react";
import { clusters, getAllPartnersFlat, type ClusterKey } from "@/data/ecosystemData";

const CLUSTER_HEX: Record<ClusterKey, string> = {
  infra: "#4a9eff",
  finance: "#e8b928",
  tech: "#2cc5c5",
  governance: "#3cb371",
  research: "#9370db",
  dev: "#e87040",
};

const CLUSTER_TEXT: Record<ClusterKey, string> = {
  infra: "text-cluster-infra",
  finance: "text-cluster-finance",
  tech: "text-cluster-tech",
  governance: "text-cluster-governance",
  research: "text-cluster-research",
  dev: "text-cluster-dev",
};

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <span>{count}</span>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const allPartners = useMemo(() => getAllPartnersFlat(), []);

  const totalPartners = allPartners.length;
  const totalCountries = [...new Set(allPartners.map((p) => p.country).filter(Boolean))].length;
  const totalActive = allPartners.filter((p) => (p.status || "active") === "active").length;
  const totalClusters = clusters.length;

  // Pie chart data
  const pieData = clusters.map((c) => ({
    name: c.label,
    value: c.partners.length,
    color: CLUSTER_HEX[c.key],
    key: c.key,
  }));

  // Status distribution
  const statusData = [
    { name: "Active", value: allPartners.filter((p) => (p.status || "active") === "active").length, color: "#34d399" },
    { name: "Review", value: allPartners.filter((p) => p.status === "review").length, color: "#fbbf24" },
    { name: "Membership", value: allPartners.filter((p) => p.status === "membership").length, color: "#60a5fa" },
  ];

  // Country distribution (top 8)
  const countryMap: Record<string, number> = {};
  allPartners.forEach((p) => { if (p.country) countryMap[p.country] = (countryMap[p.country] || 0) + 1; });
  const countryData = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  // Timeline data for bar chart
  const timelineMap: Record<string, number> = {};
  allPartners.forEach((p) => { timelineMap[p.sinceDate] = (timelineMap[p.sinceDate] || 0) + 1; });
  const timelineBarData = Object.entries(timelineMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  const statCards = [
    { icon: <Users className="w-6 h-6" />, label: "Partner Gesamt", value: totalPartners, color: "text-primary" },
    { icon: <Globe className="w-6 h-6" />, label: "Länder", value: totalCountries, color: "text-accent" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Aktive Partner", value: totalActive, color: "text-emerald-400" },
    { icon: <Layers className="w-6 h-6" />, label: "Cluster", value: totalClusters, color: "text-cluster-research" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Ecosystem Map
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-1">Analytics</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Statistik-Dashboard</h1>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 group"
            >
              <div className={`${card.color} mb-3 opacity-70 group-hover:opacity-100 transition-opacity`}>{card.icon}</div>
              <p className={`text-3xl md:text-4xl font-bold font-mono ${card.color}`}>
                <AnimatedCounter target={card.value} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cluster distribution pie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Partner pro Cluster</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={300}
                    animationDuration={1200}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.key} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 16%)", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono" }}
                    itemStyle={{ color: "hsl(210 20% 92%)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {pieData.map((d) => (
                <button
                  key={d.key}
                  onClick={() => navigate(`/cluster/${d.key}`)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Status pie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Status-Verteilung</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={500}
                    animationDuration={1200}
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 16%)", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono" }}
                    itemStyle={{ color: "hsl(210 20% 92%)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {statusData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Country bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Top Länder</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 16%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220 15% 16%)" }} />
                <YAxis tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220 15% 16%)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 16%)", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono" }}
                  itemStyle={{ color: "hsl(210 20% 92%)" }}
                />
                <Bar dataKey="value" fill="hsl(45 90% 55%)" radius={[4, 4, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Timeline bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Partnerschaften über Zeit</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 16%)" />
                <XAxis dataKey="date" tick={{ fill: "hsl(215 12% 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220 15% 16%)" }} />
                <YAxis tick={{ fill: "hsl(215 12% 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220 15% 16%)" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 16%)", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono" }}
                  itemStyle={{ color: "hsl(210 20% 92%)" }}
                />
                <Bar dataKey="count" fill="hsl(200 80% 50%)" radius={[4, 4, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cluster comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-6">Cluster-Vergleich</h3>
          <div className="space-y-4">
            {clusters.map((c, i) => {
              const countries = [...new Set(c.partners.map((p) => p.country).filter(Boolean))];
              const active = c.partners.filter((p) => (p.status || "active") === "active").length;
              const pct = (c.partners.length / totalPartners) * 100;
              return (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate(`/cluster/${c.key}`)}
                  className="flex items-center gap-4 cursor-pointer group hover:bg-secondary/20 rounded-lg p-2 -mx-2 transition-all"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold ${CLUSTER_TEXT[c.key]} group-hover:underline`}>{c.label}</span>
                      <span className="text-xs text-muted-foreground font-mono">{c.partners.length} Partner · {countries.length} Länder · {active} aktiv</span>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: CLUSTER_HEX[c.key] }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-mono font-bold" style={{ color: CLUSTER_HEX[c.key] }}>{pct.toFixed(0)}%</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
>>>>>>> df687ca2948e1c6c74443bffd9a92768e7e718ce
    </div>
  );
}
