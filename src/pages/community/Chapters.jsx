import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Chapter.list()
      .then(setChapters)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary-foreground/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary-foreground/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">Community</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Regional <span className="italic">Chapters</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto">
              ISDA is a global society with regional chapters that serve as local hubs for collaboration, events, and professional development.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : chapters.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((chapter) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {chapter.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={chapter.image_url} alt={chapter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-body text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">{chapter.name}</h3>
                    {chapter.region && <p className="text-xs font-body text-accent">{chapter.region}</p>}
                    {chapter.chair_name && <p className="text-xs font-body text-muted-foreground">Chair: {chapter.chair_name}</p>}
                    {chapter.description && <p className="text-sm font-body text-muted-foreground mt-2 line-clamp-3">{chapter.description}</p>}
                    <p className="text-xs font-body text-muted-foreground/60 mt-2">Annual fee: ${chapter.annual_fee || 5}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground font-body">Regional chapters will be announced soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
