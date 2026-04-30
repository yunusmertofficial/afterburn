"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://snqanaaufxrtxemzpnir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucWFuYWF1ZnhydHhlbXpwbmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Njg1MDQsImV4cCI6MjA5MzE0NDUwNH0.5Y3FJ4a51ekspJzkPcCq5Q16G9X2KPqxhJfzRydUvHU"
);

function WaitlistForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const { error } = await supabase.from("waitlist").insert([{ email }]);
    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 w-full max-w-md ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        placeholder="you@company.com"
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold transition-colors whitespace-nowrap"
      >
        {status === "loading" ? "Joining..." : status === "success" ? "You're in" : "Join Waitlist"}
      </button>
      {status === "success" && <p className="text-sm text-green-400 w-full mt-1">We'll reach out when early access opens.</p>}
      {status === "duplicate" && <p className="text-sm text-orange-400 w-full mt-1">You're already on the list. We'll be in touch.</p>}
      {status === "error" && <p className="text-sm text-red-400 w-full mt-1">Something went wrong. Try again.</p>}
    </form>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            After<span className="text-orange-500">burn</span>
          </span>
          <a
            href="#waitlist"
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
          >
            Early Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Accountability for postmortem action items
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
            Every action item lands.<br />
            <span className="text-orange-500">Every incident, once.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your team writes great postmortems — then nothing happens. Action items rot in spreadsheets, the same outage hits again, and leadership loses trust. Afterburn closes the loop automatically: SLA-tracked actions, escalation to managers, and causal detection that proves when an incident was preventable.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-sm text-zinc-600">No credit card. Early access for SREs and engineering managers.</p>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="py-8 border-y border-zinc-800 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-zinc-500 mb-6 uppercase tracking-widest font-medium">Designed for teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-40">
            {["B2B SaaS", "Growth-Stage", "50–300 Engineers", "On-call Teams", "Platform Orgs"].map((label) => (
              <span key={label} className="text-zinc-300 font-semibold text-sm tracking-wide">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The postmortem theater problem</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Teams spend hours writing the perfect incident review. Then the tab closes and the lessons disappear.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📋", title: "Action items rot", body: "Items get copy-pasted to Jira, assigned to the wrong team, and never followed up on. There's no SLA, no owner, no consequence." },
              { icon: "🔁", title: "Same outage, twice", body: "Three months later the same alert fires. The fix was in the postmortem — it just never shipped. Now leadership wants answers." },
              { icon: "📉", title: "Trust erodes", body: "VPs ask 'what percentage of action items actually get done?' Nobody knows. The retrospective process loses credibility." },
            ].map((card) => (
              <div key={card.title} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 px-4 sm:px-6 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">The fix</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Afterburn closes the loop</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Afterburn is the accountability layer for postmortem action items — built for SREs, visible to leadership, automatic by default.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                { step: "01", title: "Import from any postmortem", body: "Connect Incident.io, PagerDuty, Confluence, or plain Markdown. Action items are extracted automatically." },
                { step: "02", title: "SLA + owner assigned instantly", body: "Every action item gets a deadline, an owner, and a reminder cadence — before the war room closes." },
                { step: "03", title: "Auto-escalation on miss", body: "Missed deadline? Slack ping to owner. 24h later — email to their manager. No manual nagging required." },
                { step: "04", title: "Causal loop detection fires", body: "New incident? Afterburn surfaces any related abandoned action items, with estimated cost of the repeat." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-orange-500 font-mono font-bold text-sm pt-1 shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 font-mono text-sm space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-zinc-500 text-xs ml-2">afterburn / incident-247</span>
              </div>
              <div className="text-zinc-500">// New incident fired: DB timeout cascade</div>
              <div className="text-orange-400">⚠ Causal match detected</div>
              <div className="text-zinc-300">  ↳ Incident #247 — "Add connection pool limit"</div>
              <div className="text-zinc-400">     Assigned: @sarah · Due: 2024-01-15</div>
              <div className="text-red-400">     Status: OVERDUE (94 days)</div>
              <div className="text-zinc-300">  ↳ Est. cost of repeat: ~$12,400</div>
              <div className="text-zinc-500 mt-3">// Escalation sent to @sarah's manager</div>
              <div className="text-green-400">✓ VP dashboard updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything reliability teams actually need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⏱", title: "SLA Tracking", body: "Every action item has a deadline with automatic reminders. No more 'I forgot.'" },
              { icon: "📣", title: "Auto-Escalation Engine", body: "Missed deadlines escalate to managers automatically — Slack + email, on your configured cadence." },
              { icon: "🔗", title: "Causal Loop Detection", body: "When a new incident fires, instantly surface related abandoned action items and the cost of the repeat outage." },
              { icon: "📊", title: "Leadership Dashboards", body: "Completion rates, SLA adherence, repeat incident trends — visible to leadership without per-seat cost." },
              { icon: "🔌", title: "Native Integrations", body: "Incident.io, PagerDuty, Jira, Linear, Confluence, Slack, and email — meets your team where they already work." },
              { icon: "🧠", title: "Pattern Intelligence", body: "The historical incident-action graph gets smarter over time. Switch and you lose months of causal correlation." },
            ].map((feat) => (
              <div key={feat.title} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-colors group">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{feat.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 px-4 sm:px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Where Incident.io stops, Afterburn starts</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Incident.io ends when the incident ends. Afterburn starts where they stop — because the real reliability work happens after the war room closes.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium w-1/3">Capability</th>
                  <th className="px-6 py-4 text-zinc-400 font-medium text-center">Incident.io</th>
                  <th className="px-6 py-4 text-orange-400 font-semibold text-center">Afterburn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ["Incident response & comms", "✓", "Integrates"],
                  ["Postmortem writing", "✓", "Integrates"],
                  ["Action item SLA enforcement", "—", "✓"],
                  ["Auto-escalation to managers", "—", "✓"],
                  ["Causal loop detection", "—", "✓"],
                  ["Leadership completion dashboards", "Limited", "✓ No per-seat cost"],
                  ["Historical pattern intelligence", "—", "✓ Compounds over time"],
                ].map(([feature, them, us]) => (
                  <tr key={feature as string} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-zinc-300">{feature}</td>
                    <td className="px-6 py-4 text-center text-zinc-500">{them}</td>
                    <td className="px-6 py-4 text-center text-green-400 font-medium">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, team-based pricing</h2>
            <p className="text-zinc-400 text-lg">Leadership dashboards included. No per-seat gotchas.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "/mo",
                description: "Perfect for small SRE teams getting started with postmortem accountability.",
                features: ["Up to 5 team members", "SLA tracking & reminders", "Slack integration", "30-day action item history", "Basic leadership dashboard"],
                cta: "Join Waitlist",
                highlight: false,
              },
              {
                name: "Growth",
                price: "$249",
                period: "/mo",
                description: "For growing engineering orgs that need full escalation and causal detection.",
                features: ["Up to 25 team members", "Auto-escalation engine", "Causal loop detection", "Unlimited history", "Full leadership dashboards", "Jira / Linear sync"],
                cta: "Join Waitlist",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "$349",
                period: "/mo",
                description: "Unlimited scale, SSO, and dedicated support for large engineering organizations.",
                features: ["Unlimited members", "SSO / SAML", "Dedicated Slack channel", "Custom escalation policies", "SLA reporting exports", "Priority support"],
                cta: "Join Waitlist",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${
                  plan.highlight
                    ? "border-orange-500 bg-orange-500/5 relative"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-400 pb-1">{plan.period}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-orange-500 mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`w-full py-3 rounded-lg font-semibold text-center transition-colors text-sm ${
                    plan.highlight
                      ? "bg-orange-500 hover:bg-orange-400 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section id="waitlist" className="py-28 px-4 sm:px-6 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Limited early access
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Stop letting incidents<br />
            <span className="text-orange-500">repeat themselves.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Join engineering managers and SREs who are turning postmortem theater into actual reliability improvement.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          <p className="mt-6 text-sm text-zinc-600">Early access pricing locked in. No spam, ever.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold tracking-tight">
            After<span className="text-orange-500">burn</span>
          </span>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Afterburn. Built for SREs who are tired of the same outage twice.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
