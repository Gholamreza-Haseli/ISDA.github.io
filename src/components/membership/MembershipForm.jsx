import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const steps = ["Credentials", "Interests", "Confirm"];

export default function MembershipForm({ onClose }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    affiliation: "",
    position: "",
    country: "",
    membership_type: "regular",
    research_interests: "",
    colleges: [],
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await base44.entities.MembershipApplication.create(form);

      // Send welcome email
      try {
        await base44.integrations.Core.SendEmail({
          to: form.email,
          subject: "Welcome to ISDA — Application Received",
          body: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0F172A; padding: 30px; text-align: center;">
              <h1 style="color: #D97706; font-size: 24px; margin: 0;">ISDA</h1>
              <p style="color: #E2E8F0; font-size: 12px; letter-spacing: 2px; margin-top: 4px;">INTERNATIONAL SOCIETY OF DECISION ANALYTICS</p>
            </div>
            <div style="padding: 30px; background: #ffffff;">
              <h2 style="color: #0F172A; font-size: 20px;">Dear ${form.full_name},</h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                Thank you for applying to join the International Society of Decision Analytics. Your membership application has been received and is being reviewed.
              </p>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                <strong>Membership Type:</strong> ${form.membership_type}<br/>
                <strong>Affiliation:</strong> ${form.affiliation || "N/A"}
              </p>
              <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                We will contact you shortly with next steps. In the meantime, explore our journal and upcoming conferences.
              </p>
            </div>
            <div style="background: #0F172A; padding: 20px; text-align: center;">
              <p style="color: #94A3B8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} ISDA. All rights reserved.</p>
            </div>
          </div>`,
        });
      } catch {}

      setDone(true);
      toast({ title: "Application Submitted!", description: "Check your email for confirmation." });
    } catch {
      toast({ title: "Error", description: "Could not submit application. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h2 className="font-display text-2xl text-foreground mb-2">Application Received</h2>
        <p className="font-body text-muted-foreground text-sm mb-6">We've sent a confirmation email to {form.email}.</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-accent text-accent-foreground text-sm font-body font-medium rounded">Close</button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-display text-xl text-foreground">Membership Application</h2>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 px-4 pt-4">
        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            <div className={`flex items-center gap-1.5 ${idx <= step ? "text-accent" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 rounded-full text-xs font-body font-semibold flex items-center justify-center ${idx <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                {idx < step ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
              <span className="text-xs font-body font-medium hidden sm:inline">{s}</span>
            </div>
            {idx < steps.length - 1 && <div className={`flex-1 h-px ${idx < step ? "bg-accent" : "bg-border"}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Form Steps */}
      <div className="p-4 space-y-4">
        {step === 0 && (
          <>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Full Name *</label>
              <input type="text" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Affiliation</label>
              <input type="text" value={form.affiliation} onChange={(e) => update("affiliation", e.target.value)} placeholder="University or Organization" className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Position</label>
              <input type="text" value={form.position} onChange={(e) => update("position", e.target.value)} placeholder="e.g. Associate Professor" className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Country</label>
              <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Membership Type *</label>
              <select value={form.membership_type} onChange={(e) => update("membership_type", e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent">
                <option value="regular">Regular ($160/year)</option>
                <option value="student">Student (Free)</option>
                <option value="retired">Retired (Free)</option>
                <option value="affiliate">Affiliate ($25/year)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-foreground mb-1">Research Interests</label>
              <textarea value={form.research_interests} onChange={(e) => update("research_interests", e.target.value)} rows={3} placeholder="Describe your research interests..." className="w-full px-3 py-2 border border-border rounded text-sm font-body bg-background focus:outline-none focus:ring-1 focus:ring-accent resize-none" />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h3 className="font-body text-sm font-semibold text-foreground">Review Your Application</h3>
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm font-body">
              <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{form.full_name}</span></p>
              <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{form.email}</span></p>
              <p><span className="text-muted-foreground">Affiliation:</span> <span className="text-foreground">{form.affiliation || "—"}</span></p>
              <p><span className="text-muted-foreground">Position:</span> <span className="text-foreground">{form.position || "—"}</span></p>
              <p><span className="text-muted-foreground">Country:</span> <span className="text-foreground">{form.country || "—"}</span></p>
              <p><span className="text-muted-foreground">Type:</span> <span className="text-foreground capitalize">{form.membership_type}</span></p>
              {form.research_interests && <p><span className="text-muted-foreground">Interests:</span> <span className="text-foreground">{form.research_interests}</span></p>}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 0 && (!form.full_name || !form.email)}
            className="flex items-center gap-1 px-5 py-2 bg-accent text-accent-foreground text-sm font-body font-medium rounded hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1 px-5 py-2 bg-accent text-accent-foreground text-sm font-body font-medium rounded hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}
