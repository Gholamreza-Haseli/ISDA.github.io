import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui/SectionHeading";
import ConferenceCard from "@/components/cards/ConferenceCard";

export default function ConferencesPreview() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Conference.filter({ is_upcoming: true }, "start_date", 3)
      .then(setConferences)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Upcoming Conferences"
          title="Building International Linkages"
          description="A platform for sharing research, networking with global peers, and advancing the frontiers of decision analytics."
        />

        {conferences.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferences.map((conf) => (
              <ConferenceCard key={conf.id} conference={conf} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground font-body">Upcoming conferences will be announced soon.</p>
        )}

        <div className="text-center mt-10">
          <Link
            to="/conferences"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:underline"
          >
            View All Conferences <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
