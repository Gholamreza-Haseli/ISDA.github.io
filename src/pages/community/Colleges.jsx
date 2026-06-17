import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.College.list()
      .then(setColleges)
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
              Special Interest <span className="italic">Groups</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto">
              ISDA authorizes the creation of special interest groups in key areas of decision analytics to facilitate member activities and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : colleges.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {college.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={college.image_url} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-body text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">{college.name}</h3>
                    {college.chair_name && <p className="text-xs font-body text-accent">{college.chair_name}</p>}
                    {college.chair_affiliation && <p className="text-xs font-body text-muted-foreground">{college.chair_affiliation}</p>}
                    {college.description && <p className="text-sm font-body text-muted-foreground mt-2 line-clamp-2">{college.description}</p>}
                    <p className="text-xs font-body text-muted-foreground/60 mt-2">Annual fee: ${college.annual_fee || 15}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground font-body mb-2">Special interest groups will be announced soon.</p>
              <p className="text-sm text-muted-foreground font-body">All ISDA members are eligible to join the SIGs of their choice.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
