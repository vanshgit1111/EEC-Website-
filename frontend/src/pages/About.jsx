import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import Seo from "@/components/Seo";

const BG = "https://images.unsplash.com/photo-1779700210487-a01758a3c55a";

export default function About() {
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref =
    isAuthed && user.role === "admin" ? "/admin"
    : isAuthed && user.role === "supplier" ? "/supplier"
    : "/buyer";
  return (
    <div data-testid="about-page">
      <Seo
        title="About — Elan Exports Consultancy"
        description={`We make India & Asia sourcing predictable for international buyers. Embedded supplier desks, on-ground audits and landed cost accountability.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home" },
            { "@type": "ListItem", position: 2, name: "About" }
          ]
        }}
      />
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/92 to-[#FFFFFF]/60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <div className="overline mb-4">About EEC</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            We do one thing — make India &amp; Asia sourcing <span className="gold-text">predictable.</span>
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="overline mb-3">Origin</div>
            <h2 className="font-display text-3xl text-[#012D76] tracking-tight font-light">
              Born inside procurement teams. Not in a marketplace.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[#3A4759] leading-relaxed">
            <p>
              Élan Exports Consultancy was founded by ex-procurement leaders from global retail,
              automotive and pharma companies who repeatedly faced the same problem: the gap between a
              "supplier on paper" and a "supplier that can actually ship".
            </p>
            <p>
              EEC bridges that gap. We don't sell software, we don't run a marketplace, and we don't sell
              listings to suppliers. We operate as the embedded sourcing arm for international buyers —
              with skin in the game on landed cost, lead times and on-time-in-full.
            </p>
            <p>
              Today we run dedicated supplier desks across six categories and operate from Mumbai, Bengaluru and
              Singapore — with on-ground audit partners in Vietnam, Bangladesh, Indonesia and Thailand.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { k: "Significant", v: "Sourced volume managed" },
            { k: "42", v: "Active categories" },
            { k: "180+", v: "Audited factories on bench" },
            { k: "11", v: "Buyer countries served" },
            { k: "94%", v: "OTIF rate across active programs" },
            { k: "9.1%", v: "Avg. landed cost reduction (Y1)" },
          ].map((s) => (
            <div key={s.k} className="border-l border-[#C9A23F]/70 pl-6 py-2">
              <div className="font-display text-4xl text-[#012D76]">{s.k}</div>
              <div className="text-xs text-[#6B7280] mt-2 tracking-widest uppercase">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Principles</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl mb-12">
            How we operate.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Open-book commercials", d: "We disclose every layer of cost. Our fee is the only margin you pay us." },
              { t: "Supplier-neutral", d: "We do not take listing or activation fees from suppliers. Buyer is the customer." },
              { t: "Documentation-first", d: "Every shortlist comes with audit notes, financial sanity and risk flags." },
            ].map((p) => (
              <div key={p.t} className="border hairline p-8 bg-surface">
                <div className="font-display text-xl text-[#012D76] mb-2">{p.t}</div>
                <div className="text-sm text-[#3A4759] leading-relaxed">{p.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            {isAuthed ? (
              <Link to={dashboardHref} className="eec-btn-primary" data-testid="about-cta-dashboard">
                Go to dashboard <ArrowUpRight size={16} />
              </Link>
            ) : (
              <Link to="/buyer/intake" className="eec-btn-primary" data-testid="about-cta">
                Start an engagement <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
