import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui/SectionHeading";
import ConferenceCard from "@/components/cards/ConferenceCard";

export default function Conferences() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Conference.filter({ is_upcoming: true }, "start_date").catch(() => []),
      base44.entities.Conference.filter({ is_upcoming: false }, "-start_date").catch(() => []),
    ]).then(([u, p]) => {
      setUpcoming(u);
      setPast(p);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary-foreground/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary-foreground/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">Conferences</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Building International <span className="italic">Linkages</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto">
              A platform for sharing research, networking with global peers, and advancing the frontiers of decision analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Upcoming" title="Upcoming Conferences" />
          {loading ? (
            <div className="text-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : upcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((c) => <ConferenceCard key={c.id} conference={c} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body">Upcoming conferences will be announced soon.</p>
          )}
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Past Events" title="Past Conferences" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {past.map((c) => <ConferenceCard key={c.id} conference={c} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
