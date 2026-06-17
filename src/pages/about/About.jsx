import React from "react";
import { motion } from "framer-motion";
import { Target, Globe, GraduationCap, Users, History as HistoryIcon, Scale } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "react-router-dom";

const timeline = [
  { year: "2024", event: "ISDA Founded — Establishing a global hub for decision analytics research and practice." },
  { year: "2024", event: "First Annual Conference — Bringing together scholars from 30+ countries." },
  { year: "2025", event: "Launch of the ISDA Journal of Decision Analytics — Flagship peer-reviewed publication." },
  { year: "2025", event: "Regional Chapters Established — Americas, Europe, Asia-Pacific, and Middle East & Africa." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary-foreground/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary-foreground/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">About ISDA</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Advancing Decision Science <span className="italic">Globally</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              The International Society of Decision Analytics is dedicated to fostering a global community of scholars, practitioners, and educators who push the boundaries of analytical decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">Mission</span>
              </div>
              <h2 className="font-display text-3xl text-foreground mb-4">Our Purpose</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                ISDA exists to extend and integrate knowledge that contributes to the improved understanding and practice of decision analytics across all sectors — from healthcare and supply chains to finance and public policy.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We are problem-centered. We do not rely on particular methodologies but encourage diverse approaches — analytical modeling, empirical research, behavioral studies, and computational methods — united by the common goal of better decisions.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-accent" />
                <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">Vision</span>
              </div>
              <h2 className="font-display text-3xl text-foreground mb-4">Our Aspiration</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                To become the world's premier scholarly society for decision analytics, recognized for the quality of its publications, the rigor of its conferences, and the global reach of its membership.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We envision a future where data-driven decision-making is not just a competitive advantage but a fundamental practice embedded in every organization and every policy framework.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section id="history" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our History"
            title="Milestones in Our Journey"
            description="From our founding to today, ISDA has grown into a vibrant global community."
          />
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-16 text-right">
                  <span className="font-display text-xl text-accent">{item.year}</span>
                </div>
                <div className="w-px bg-border shrink-0 self-stretch relative">
                  <div className="absolute top-1 -left-1 w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <p className="font-body text-foreground/80 leading-relaxed pt-0.5">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-accent-foreground mb-4">Ready to Make an Impact?</h2>
          <p className="font-body text-accent-foreground/80 mb-6">Join a growing network of scholars and practitioners shaping the future of decision analytics.</p>
          <Link to="/membership" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-body font-semibold text-sm rounded hover:bg-primary/90 transition-colors">
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
}
