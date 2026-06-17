import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsCard from "@/components/cards/NewsCard";
import NewsletterBar from "@/components/home/NewsletterBar";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    base44.entities.NewsArticle.filter({ is_published: true }, "-publish_date")
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(articles.map((a) => a.category).filter(Boolean))];
  const filtered = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary-foreground/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary-foreground/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">News & Updates</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
              The ISDA <span className="italic">Chronicle</span>
            </h1>
            <p className="text-base lg:text-lg font-body text-primary-foreground/70 max-w-2xl mx-auto">
              Stay informed about the latest research, events, awards, and society announcements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      {categories.length > 1 && (
        <section className="py-4 border-b border-border bg-background sticky top-16 lg:top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-xs font-body font-medium rounded transition-colors capitalize ${
                    filter === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground font-body py-20">No news articles yet. Check back soon!</p>
          )}
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
