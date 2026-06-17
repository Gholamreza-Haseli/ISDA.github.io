import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { BookOpen, ExternalLink, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import OfficerCard from "@/components/cards/OfficerCard";

export default function Journal() {
  const [editors, setEditors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Officer.filter({ category: "founder" }).catch(() => []),
      base44.entities.JournalDepartment.list().catch(() => []),
    ]).then(([eds, deps]) => {
      setEditors(eds);
      setDepartments(deps);
    }).finally(() => setLoading(false));
  }, []);

  const rankings = [
    "Featured in top academic journal rankings worldwide",
    "A* level (highest level) in the Australian Business Deans Council",
    "Indexed in leading scientific databases",
    "Interdisciplinary scope across decision sciences, operations, AI, and analytics",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary-foreground/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary-foreground/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">Publications</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
              ISDA Journal of <span className="italic">Decision Analytics</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Our flagship research journal publishes cutting-edge work at the intersection of analytics, operations, and strategic decision-making.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body font-semibold text-sm rounded hover:bg-accent/90 transition-colors">
                <BookOpen className="w-4 h-4" /> Access Journal
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/20 text-primary-foreground text-sm font-body font-medium rounded hover:border-accent hover:text-accent transition-colors">
                <ExternalLink className="w-4 h-4" /> Submit Paper
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl text-foreground mb-4">Mission</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                The mission of the ISDA Journal is to serve as the flagship research journal in decision analytics. It publishes scientific research into the problems, interests, and concerns of professionals who design, optimize, and implement analytical decision systems.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                The journal covers all topics in decision science and welcomes papers using any research paradigm — analytical, empirical, behavioral, and computational.
              </p>
            </div>
            <div className="space-y-3">
              {rankings.map((r, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm font-body text-foreground/80">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editors */}
      <section id="editors" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Editorial Board" title="Editors" />
          {loading ? (
            <div className="text-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : editors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {editors.map((ed) => <OfficerCard key={ed.id} officer={ed} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body">Editorial board will be announced soon.</p>
          )}
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Departments" title="Research Departments" description="Specialized areas within the journal, each led by distinguished editors." />
          {departments.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {dept.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={dept.image_url} alt={dept.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-body text-sm font-semibold text-foreground mb-1">{dept.name}</h3>
                    <p className="text-xs font-body text-accent">{dept.editor_name}</p>
                    {dept.editor_affiliation && <p className="text-xs font-body text-muted-foreground">{dept.editor_affiliation}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body">Departments will be announced soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
