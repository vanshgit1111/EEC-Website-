import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import Seo from "@/components/Seo";

const BG = "https://images.unsplash.com/photo-1779700210487-a01758a3c55a";

const ABOUT_FAQ = [
  ["When was Elan Exports Consultancy established?", "Elan Exports Consultancy Pte. Ltd. was incorporated in Singapore in 2025. Since then, EEC has supported businesses with global sourcing, supplier qualification and procurement services across a range of industries."],
  ["Is EEC a Singapore company?", "Yes. Elan Exports Consultancy Pte. Ltd. is headquartered in Singapore and serves buyers and suppliers across international markets through its global sourcing network."],
  ["What does EEC do?", "EEC is a global sourcing consultancy that helps businesses identify, evaluate and work with verified manufacturers worldwide. Our services include supplier identification, supplier qualification, procurement coordination and sourcing support."],
  ["What industries does EEC specialise in?", "EEC supports sourcing across Food Commodities, Processed & Packaged Foods, Fresh & Agricultural Products, Healthcare & Hospital Supplies, Home Textile, Apparel & Hospitality Products, and Eco-Friendly, Sustainable & Organic Products, depending on client requirements."],
  ["What makes EEC different?", "EEC combines procurement expertise with a carefully developed global supplier network. Our focus on supplier qualification, transparent sourcing practices and long term partnerships helps businesses source with greater confidence while building reliable international supply chains."],
];

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
        title="About Elan Exports Consultancy | Singapore Headquartered Global Sourcing Consultancy"
        description="Elan Exports Consultancy (EEC) is a Singapore headquartered global sourcing consultancy connecting buyers with verified manufacturers worldwide. With particular expertise across India and Asia, we help businesses build reliable supply chain partnerships through procurement and sourcing."
        canonical="https://eectrade.com/about"
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
            Elan Exports Consultancy (EEC) was established to simplify international sourcing by helping businesses identify qualified manufacturing partners and build resilient supply chains. Headquartered in Singapore, EEC combines procurement expertise with a global supplier network to support buyers across a wide range of industries.
            </p>
            <p>
              Rather than operating as a marketplace, EEC works as a strategic sourcing consultancy, supporting supplier identification, supplier qualification, procurement coordination and sourcing strategy. Our approach is built on transparency, collaboration and long term business relationships
            </p>
            <p>
              While EEC has developed extensive sourcing expertise and a strong supplier network across India and Asia, we also work with verified manufacturers in other global markets to meet our clients' sourcing requirements.
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
          <p className="md:col-span-3 text-xs uppercase tracking-[0.24em] text-[#6B7280]">All figures as of Q2 2026.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Principles</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl mb-12">
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Strategic Sourcing", d: "Every sourcing project begins with a clear understanding of the buyer's objectives, product specifications and commercial requirements, enabling us to identify suppliers best suited to the project." },
              { t: "Supplier Qualification", d: "We work with manufacturers that demonstrate strong production capabilities, quality management systems, export readiness and operational transparency, helping buyers make informed sourcing decisions." },
              { t: "Long Term Partnerships", d: "We believe successful sourcing is built on trust, communication and collaboration. Our goal is to develop sustainable relationships that create long term value for both buyers and suppliers." },
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
                Talk to Our Sourcing Team <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light mb-8">
            Frequently asked questions about EEC
          </h2>
          <div className="border hairline bg-elevated overflow-hidden">
            {ABOUT_FAQ.map(([q, a], idx) => (
              <div key={q} className={`${idx !== ABOUT_FAQ.length - 1 ? "border-b hairline" : ""} grid grid-cols-1 md:grid-cols-[36%_1fr]`}>
                <div className="p-5 md:p-6 font-medium text-[#012D76]">{q}</div>
                <div className="p-5 md:p-6 text-[#3A4759] leading-relaxed">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
