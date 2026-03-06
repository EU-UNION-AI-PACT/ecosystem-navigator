import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, Users, Calendar, Link2, MapPin, Search, Filter, ExternalLink, Grid3X3, List, LayoutGrid } from "lucide-react";
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

type ViewMode = "grid" | "list" | "compact";


  const { clusterId } = useParams<{ clusterId: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [countryFilter, setCountryFilter] = useState<string[]>([]);
  const [integrationFilter, setIntegrationFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const cluster = clusters.find((c) => c.key === clusterId);

  // Filteroptionen
  const statusOptions = useMemo(() => cluster ? Array.from(new Set(cluster.partners.map(p => p.status || "active"))) : [], [cluster]);
  const countryOptions = useMemo(() => cluster ? Array.from(new Set(cluster.partners.map(p => p.country).filter(Boolean))) : [], [cluster]);
  const integrationOptions = useMemo(() => cluster ? Array.from(new Set(cluster.partners.flatMap(p => p.integration ? p.integration.split(", ") : []))) : [], [cluster]);

  // Gefilterte Partner
  const filteredPartners = useMemo(() => {
    if (!cluster) return [];
    return cluster.partners.filter(p => {
      const matchesSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
        (p.leader && p.leader.toLowerCase().includes(search.toLowerCase())) ||
        (p.role && p.role.toLowerCase().includes(search.toLowerCase())) ||
        (p.integration && p.integration.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(p.status || "active");
      const matchesCountry = countryFilter.length === 0 || countryFilter.includes(p.country || "");
      const matchesIntegration = integrationFilter.length === 0 || (p.integration && integrationFilter.some(f => p.integration?.includes(f)));
      return matchesSearch && matchesStatus && matchesCountry && matchesIntegration;
    });
  }, [cluster, search, statusFilter, countryFilter, integrationFilter]);

  const activeCount = filteredPartners.filter((p) => p.status === "active").length;
  const reviewCount = filteredPartners.filter((p) => p.status === "review").length;
  const memberCount = filteredPartners.filter((p) => p.status === "membership").length;
  const countries = [...new Set(filteredPartners.map((p) => p.country).filter(Boolean))];

  const hasActiveFilters = statusFilter.length > 0 || countryFilter.length > 0 || integrationFilter.length > 0 || search.length > 0;

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

<<<<<<< HEAD
  // Filter State
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [countryFilter, setCountryFilter] = React.useState<string[]>([]);
  const [integrationFilter, setIntegrationFilter] = React.useState<string[]>([]);

  // Filter Options
  const statusOptions = Array.from(new Set(cluster.partners.map(p => p.status || "active")));
  const countryOptions = Array.from(new Set(cluster.partners.map(p => p.country).filter(Boolean)));
  const integrationOptions = Array.from(new Set(cluster.partners.flatMap(p => p.integration ? p.integration.split(", ") : [])));

  // Filtered Partners
  const filteredPartners = cluster.partners.filter(p => {
    const matchesSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(p.status || "active");
    const matchesCountry = countryFilter.length === 0 || countryFilter.includes(p.country || "");
    const matchesIntegration = integrationFilter.length === 0 || (p.integration && integrationFilter.some(f => p.integration?.includes(f)));
    return matchesSearch && matchesStatus && matchesCountry && matchesIntegration;
  });

  const activeCount = filteredPartners.filter((p) => p.status === "active").length;
  const reviewCount = filteredPartners.filter((p) => p.status === "review").length;
  const memberCount = filteredPartners.filter((p) => p.status === "membership").length;
  const countries = [...new Set(filteredPartners.map((p) => p.country).filter(Boolean))];

=======
>>>>>>> df687ca2948e1c6c74443bffd9a92768e7e718ce
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative border-b border-border bg-card/50 backdrop-blur-md overflow-hidden">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]})` }}
          />
        </motion.div>

        return (
          <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="relative border-b border-border bg-card/50 backdrop-blur-md overflow-hidden">
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <div
                  className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10"
                  style={{ backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]})` }}
                />
              </motion.div>

              <div className="relative max-w-6xl mx-auto px-6 py-8">
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Zurück zur Ecosystem Map
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span
                      className="text-4xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      {cluster.icon}
                    </motion.span>
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
                  {[
                    { icon: <Users className="w-4 h-4 text-primary" />, value: cluster.partners.length, label: "Partner" },
                    { icon: <span className="w-2 h-2 rounded-full bg-emerald-400" />, value: activeCount, label: "Active" },
                    ...(reviewCount > 0 ? [{ icon: <span className="w-2 h-2 rounded-full bg-amber-400" />, value: reviewCount, label: "Review" }] : []),
                    ...(memberCount > 0 ? [{ icon: <span className="w-2 h-2 rounded-full bg-blue-400" />, value: memberCount, label: "Memberships" }] : []),
                    { icon: <Globe className="w-4 h-4 text-muted-foreground" />, value: countries.length, label: "Länder" },
                  ].map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border"
                    >
                      {metric.icon}
                      <span className="text-sm font-mono font-bold text-primary">{metric.value}</span>
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </header>

            {/* Filter UI und Partner Grid */}
            <main className="max-w-6xl mx-auto px-6 py-10">
              {/* Filter UI */}
              <div className="mb-8 flex flex-wrap gap-4 items-center">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Suche Partner, Beschreibung, Leader, Rolle, Integration..."
                  className="px-4 py-2 rounded border border-border bg-card text-foreground focus:border-primary focus:outline-none cluster-detail-filter min-w-[220px]"
                />
                {/* Status Multi-Select */}
                <select
                  multiple
                  value={statusFilter}
                  onChange={e => setStatusFilter(Array.from(e.target.selectedOptions, o => o.value))}
                  className="px-4 py-2 rounded border border-border bg-card text-foreground focus:border-primary focus:outline-none cluster-detail-select min-w-[160px]"
                  title="Status Filter"
                >
                  <option value="">Status wählen...</option>
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{STATUS_LABELS[opt]?.label || opt}</option>
                  ))}
                </select>
                {/* Country Multi-Select */}
                <select
                  multiple
                  value={countryFilter}
                  onChange={e => setCountryFilter(Array.from(e.target.selectedOptions, o => o.value))}
                  className="px-4 py-2 rounded border border-border bg-card text-foreground focus:border-primary focus:outline-none cluster-detail-select min-w-[140px]"
                  title="Land Filter"
                >
                  <option value="">Land wählen...</option>
                  {countryOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {/* Integration Multi-Select */}
                <select
                  multiple
                  value={integrationFilter}
                  onChange={e => setIntegrationFilter(Array.from(e.target.selectedOptions, o => o.value))}
                  className="px-4 py-2 rounded border border-border bg-card text-foreground focus:border-primary focus:outline-none cluster-detail-integration-select min-w-[160px]"
                  title="Integration Filter"
                >
                  <option value="">Integration wählen...</option>
                  {integrationOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {/* Partner Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPartners.map((partner, i) => {
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
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono border cluster-detail-tag"
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
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono border cluster-detail-tag"
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
=======
      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto px-6 py-6"
      >
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Partner, Leader, Integration suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm backdrop-blur-sm"
            />
          </div>

          {/* Filter toggle & view toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>

            <div className="flex rounded-lg border border-border overflow-hidden">
              {([
                { mode: "grid" as ViewMode, icon: <LayoutGrid className="w-4 h-4" /> },
                { mode: "list" as ViewMode, icon: <List className="w-4 h-4" /> },
                { mode: "compact" as ViewMode, icon: <Grid3X3 className="w-4 h-4" /> },
              ]).map(({ mode, icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2.5 transition-all ${
                    viewMode === mode
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
>>>>>>> df687ca2948e1c6c74443bffd9a92768e7e718ce
        </div>

        {/* Filter dropdowns */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
                {/* Status filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Status</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setStatusFilter(null)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${!statusFilter ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                    >
                      Alle
                    </button>
                    {statuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                        className={`px-3 py-1 rounded-full text-xs border transition-all flex items-center gap-1.5 ${statusFilter === s ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_LABELS[s].dot}`} />
                        {STATUS_LABELS[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Land</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setCountryFilter(null)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${!countryFilter ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                    >
                      Alle
                    </button>
                    {countries.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCountryFilter(countryFilter === c ? null : c)}
                        className={`px-3 py-1 rounded-full text-xs border transition-all ${countryFilter === c ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integration filter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Integration</label>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    <button
                      onClick={() => setIntegrationFilter(null)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${!integrationFilter ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                    >
                      Alle
                    </button>
                    {allIntegrations.slice(0, 12).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setIntegrationFilter(integrationFilter === tag ? null : tag)}
                        className={`px-3 py-1 rounded-full text-xs border transition-all ${integrationFilter === tag ? "bg-primary/15 border-primary/30 text-primary" : "bg-secondary/50 border-border text-muted-foreground"}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() => { setStatusFilter(null); setCountryFilter(null); setIntegrationFilter(null); setSearchQuery(""); }}
                    className="self-end text-xs text-destructive hover:underline font-mono"
                  >
                    ✕ Filter zurücksetzen
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        {hasActiveFilters && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground font-mono mt-3"
          >
            {filteredPartners.length} von {cluster.partners.length} Partnern
          </motion.p>
        )}
      </motion.div>

      {/* Partner Grid / List */}
      <main className="max-w-6xl mx-auto px-6 pb-10">
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              : viewMode === "list"
              ? "space-y-3"
              : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, i) => {
              const status = STATUS_LABELS[partner.status || "active"];

              if (viewMode === "compact") {
                return (
                  <motion.div
                    key={partner.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 hover:border-primary/20 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      <h3 className={`font-bold text-sm ${CLUSTER_TEXT[cluster.key]} truncate`}>{partner.name}</h3>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono truncate">{partner.role}</p>
                    {partner.city && (
                      <p className="text-[10px] text-muted-foreground mt-1">{partner.city}, {partner.country}</p>
                    )}
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline mt-1 inline-flex items-center gap-0.5">
                        <ExternalLink className="w-2.5 h-2.5" /> Website
                      </a>
                    )}
                  </motion.div>
                );
              }

              if (viewMode === "list") {
                return (
                  <motion.div
                    key={partner.name}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/20 transition-all flex items-start gap-4"
                    style={{ borderLeftColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.5)`, borderLeftWidth: 3 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-lg ${CLUSTER_TEXT[cluster.key]}`}>{partner.name}</h3>
                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                        <span className="text-[10px] text-muted-foreground font-mono">{status.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono mb-1">{partner.role}</p>
                      {partner.description && <p className="text-sm text-foreground/70 line-clamp-1">{partner.description}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[11px] text-muted-foreground shrink-0">
                      {partner.leader && <span className="font-medium text-foreground">{partner.leader}</span>}
                      {partner.city && <span>{partner.city}, {partner.country}</span>}
                      <span className="font-mono">seit {partner.since}</span>
                      {partner.website && (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Website
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              }

              // Grid view (default)
              return (
                <motion.div
                  key={partner.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/20 transition-all group"
                  style={{
                    borderTopColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.4)`,
                    borderTopWidth: 2,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`font-bold text-lg ${CLUSTER_TEXT[cluster.key]}`}>{partner.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{partner.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                      <span className="text-[10px] text-muted-foreground font-mono">{status.label}</span>
                    </div>
                  </div>

                  {partner.description && (
                    <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{partner.description}</p>
                  )}

                  {partner.leader && (
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground/60"
                      >
                        {partner.leader.charAt(0)}
                      </motion.div>
                      <div>
                        <span className="font-medium text-foreground">{partner.leader}</span>
                        <span className="text-muted-foreground"> · {partner.leaderTitle}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
                    {partner.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {partner.city}, {partner.country}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> seit {partner.since}
                    </span>
                    {partner.lat && partner.lng && (
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Globe className="w-3 h-3" /> {partner.lat.toFixed(2)}°, {partner.lng.toFixed(2)}°
                      </span>
                    )}
                  </div>

                  {/* Website link */}
                  {partner.website && (
                    <div className="mt-2">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
                      >
                        <ExternalLink className="w-3 h-3" /> Website besuchen
                      </a>
                    </div>
                  )}

                  {partner.integration && (
                    <div className="mt-3 pt-2 border-t border-border/30">
                      <div className="flex items-center gap-1 mb-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                        <Link2 className="w-3 h-3" /> Integration
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {partner.integration.split(", ").map((tag) => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono border cursor-default"
                            style={{
                              backgroundColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.06)`,
                              borderColor: `hsl(${CLUSTER_COLORS[cluster.key]} / 0.15)`,
                              color: `hsl(${CLUSTER_COLORS[cluster.key]})`,
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPartners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">Keine Partner gefunden</p>
            <button
              onClick={() => { setStatusFilter(null); setCountryFilter(null); setIntegrationFilter(null); setSearchQuery(""); }}
              className="text-primary text-sm mt-2 hover:underline"
            >
              Filter zurücksetzen
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
