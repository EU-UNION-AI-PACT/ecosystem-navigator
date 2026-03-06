import React from "react";
import { motion } from "framer-motion";
import { clusters } from "@/data/ecosystemData";

function getAllPartners() {
  return clusters.flatMap(c => c.partners.map(p => ({
    ...p,
    cluster: c.label,
    clusterKey: c.key,
    clusterColor: `hsl(var(--cluster-${c.key}))`,
  })));
}

function sortByDate(a, b) {
  return a.sinceDate.localeCompare(b.sinceDate);
}

export default function Timeline() {
  const partners = getAllPartners().sort(sortByDate);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
        Partnerschaften Timeline
      </motion.h2>
      <div className="overflow-x-auto">
        <div className="flex gap-8 items-center min-w-[900px]">
          {partners.map((p, i) => (
            <motion.div
              key={p.name + p.sinceDate}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex flex-col items-center relative"
            >
              <div className={`timeline-dot bg-cluster-${p.clusterKey}`} />
              <div className="bg-card border border-border rounded-lg px-4 py-2 mt-2 shadow">
                <div className="text-xs text-muted-foreground mb-1">{p.since}</div>
                <div className={`font-bold text-sm mb-1 timeline-name text-cluster-${p.clusterKey}`}>{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.cluster}</div>
              </div>
              {i < partners.length - 1 && (
                <div className={`timeline-gradient bg-gradient-to-b from-cluster-${p.clusterKey} to-transparent`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
