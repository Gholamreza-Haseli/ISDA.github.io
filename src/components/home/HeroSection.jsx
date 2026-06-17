import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({ heroImage, networkImage }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
      {/* Background Image */}
      {networkImage && (
        <div className="absolute inset-0">
          <img src={networkImage} alt="" className="w-full h-full object-cover opacity-20" />
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

      {/* Hairlines decoration */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-primary-foreground/5" />
      <div className="absolute top-0 left-2/4 w-px h-full bg-primary-foreground/5" />
      <div className="absolute top-0 left-3/4 w-px h-full bg-primary-foreground/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-6">
              International Society of Decision Analytics
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight mb-6">
              Shaping the Future of
              <span className="italic block text-accent"> Analytical Decisions</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-lg mb-10 leading-relaxed">
              A global community of researchers, practitioners, and educators advancing the science of decision-making through rigorous analytics, interdisciplinary collaboration, and knowledge dissemination.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-body font-semibold text-sm rounded hover:bg-accent/90 transition-colors"
              >
                Join the Society <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/20 text-primary-foreground font-body font-medium text-sm rounded hover:border-accent hover:text-accent transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Explore Research
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            {heroImage && (
              <div className="rounded-lg overflow-hidden shadow-2xl border border-primary-foreground/10">
                <img src={heroImage} alt="Modern research environment" className="w-full h-auto" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
