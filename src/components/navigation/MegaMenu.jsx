import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    label: "About",
    children: [
      { label: "Mission & Vision", path: "/about" },
      { label: "History", path: "/about#history" },
      { label: "Bylaws & Governance", path: "/bylaws" },
    ],
  },
  {
    label: "Leadership",
    children: [
      { label: "Board of Directors", path: "/leadership" },
      { label: "Past Officers", path: "/leadership?filter=past_president" },
      { label: "Executive Team", path: "/leadership?filter=executive" },
    ],
  },
  {
    label: "Membership",
    children: [
      { label: "Join ISDA", path: "/membership" },
      { label: "Membership Benefits", path: "/membership#benefits" },
      { label: "Membership Types & Fees", path: "/membership#types" },
    ],
  },
  {
    label: "Publications",
    children: [
      { label: "Journal", path: "/journal" },
      { label: "Editorial Board", path: "/journal#editors" },
      { label: "Departments", path: "/journal#departments" },
    ],
  },
  {
    label: "Conferences",
    path: "/conferences",
  },
  {
    label: "Community",
    children: [
      { label: "Special Interest Groups", path: "/colleges" },
      { label: "Regional Chapters", path: "/chapters" },
    ],
  },
  {
    label: "News",
    path: "/news",
  },
];

export default function MegaMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (idx) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Thin accent line at top */}
      <div className="h-0.5 bg-accent w-full" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-lg font-bold">IS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg text-foreground leading-none block">ISDA</span>
              <span className="text-xs text-muted-foreground font-body tracking-wide">Decision Analytics</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-body font-medium text-foreground/80 hover:text-accent transition-colors">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="px-3 py-2 text-sm font-body font-medium text-foreground/80 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2 min-w-[220px]"
                    >
                      <div className="bg-card border border-border rounded-lg shadow-xl p-2">
                        {item.children.map((child, cidx) => (
                          <Link
                            key={cidx}
                            to={child.path}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-3 py-2.5 text-sm font-body text-foreground/80 hover:text-accent hover:bg-muted rounded-md transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/membership"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-sm font-body font-semibold rounded hover:bg-accent/90 transition-colors"
            >
              Join ISDA
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                        className="flex items-center justify-between w-full px-3 py-3 text-sm font-body font-medium text-foreground"
                      >
                        {item.label}
                        <ChevronRight className={`w-4 h-4 transition-transform ${mobileExpanded === idx ? "rotate-90" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child, cidx) => (
                              <Link
                                key={cidx}
                                to={child.path}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2.5 text-sm font-body text-muted-foreground hover:text-accent"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-3 text-sm font-body font-medium text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/membership"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 mt-3 bg-accent text-accent-foreground text-sm font-body font-semibold rounded"
              >
                Join ISDA
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
