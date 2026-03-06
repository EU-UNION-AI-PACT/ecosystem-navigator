import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Map } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Ecosystem", icon: <Map className="w-4 h-4" /> },
  { path: "/dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-1.5 flex items-center gap-1"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </motion.nav>
  );
}
