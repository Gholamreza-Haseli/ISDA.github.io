import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function JournalPreview({ journalImage }) {
  const rankings = [
    "Featured in top academic journal rankings worldwide",
    "A* level in the Australian Business Deans Council (ABDC)",
    "Indexed in leading scientific databases",
    "Interdisciplinary scope across decision sciences",
  ];

  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground overflow-hidden relative">
      {/* Decorative hairlines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-primary-foreground/5" />
      <div className="absolute top-0 right-3/4 w-px h-full bg-primary-foreground/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {journalImage && (
              <div className="rounded-lg overflow-hidden shadow-2xl border border-primary-foreground/10 max-w-md mx-auto lg:mx-0">
                <img src={journalImage} alt="ISDA Journal" className="w-full h-auto" />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Journal
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-tight mb-5">
              Stay at the Frontier of Decision Science
            </h2>
            <p className="text-base font-body text-primary-foreground/70 leading-relaxed mb-8">
              The ISDA Journal of Decision Analytics publishes cutting-edge research into the problems, interests, and innovations at the intersection of analytics, operations, and strategic decision-making.
            </p>

            <ul className="space-y-3 mb-8">
              {rankings.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm font-body text-primary-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body font-semibold text-sm rounded hover:bg-accent/90 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Access Journal
              </Link>
              <Link
                to="/journal#editors"
                className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:underline"
              >
                Editorial Board <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
