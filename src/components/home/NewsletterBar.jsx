import React, { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await base44.entities.NewsletterSubscriber.create({
        email,
        subscribed_date: new Date().toISOString().split("T")[0],
      });
      setDone(true);
      toast({ title: "Subscribed!", description: "You'll receive our newsletter at " + email });

      // Send welcome email
      try {
        await base44.integrations.Core.SendEmail({
          to: email,
          subject: "Welcome to the ISDA Newsletter",
          body: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0F172A; padding: 30px; text-align: center;">
              <h1 style="color: #D97706; font-size: 24px; margin: 0;">ISDA</h1>
              <p style="color: #E2E8F0; font-size: 12px; letter-spacing: 2px; margin-top: 4px;">INTERNATIONAL SOCIETY OF DECISION ANALYTICS</p>
            </div>
            <div style="padding: 30px; background: #ffffff;">
              <h2 style="color: #0F172A; font-size: 20px;">Welcome to our Newsletter</h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to the ISDA Newsletter. You'll receive updates on the latest research, upcoming conferences, and society news directly in your inbox.
              </p>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                Stay connected with the global community of decision analytics professionals.
              </p>
            </div>
            <div style="background: #0F172A; padding: 20px; text-align: center;">
              <p style="color: #94A3B8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} ISDA. All rights reserved.</p>
            </div>
          </div>`,
        });
      } catch {}
    } catch (err) {
      toast({ title: "Error", description: "Could not subscribe. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-accent py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-accent-foreground" />
            <span className="font-body text-sm font-semibold text-accent-foreground">
              Subscribe to the ISDA Newsletter
            </span>
          </div>

          {done ? (
            <div className="flex items-center gap-2 text-sm font-body font-medium text-accent-foreground">
              <Check className="w-4 h-4" /> Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-4 py-2 rounded bg-accent-foreground/10 border border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50 text-sm font-body w-64 focus:outline-none focus:ring-1 focus:ring-accent-foreground/40"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-body font-medium rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "..." : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
