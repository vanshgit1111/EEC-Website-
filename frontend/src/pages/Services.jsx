import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Search, ClipboardCheck, FileBarChart, Anchor } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Seo from "@/components/Seo";

const SERVICES = [
  { icon: Search, t: "Supplier discovery & qualification", d: "Curated shortlists with IEC, GST, financial and operational checks." },
  { icon: ClipboardCheck, t: "Factory audits", d: "Virtual and on-ground audits across India, Vietnam, Bangladesh, Indonesia." },
  { icon: FileBarChart, t: "Landed cost modeling", d: "Open-book FOB, duty, freight and last-mile cost reconciliation." },
  { icon: Anchor, t: "Shipment orchestration", d: "Freight, customs, AQL inspections and dispatch tracking." },
];

export default function Services() {
  const [pricing, setPricing] = useState([]);
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref =
    isAuthed && user.role === "admin" ? "/admin"
    : isAuthed && user.role === "supplier" ? "/supplier"
    : "/buyer";
  useEffect(() => {
    api.get("/pricing").then(({ data }) => setPricing(data)).catch(() => {});
  }, []);

  return (
    <div data-testid="services-page">
      <Seo
        title="Services — Elan Exports"
        description={`Sourcing services, unbundled. One-time supplier validation or a quarterly retainer that runs your India & Asia sourcing.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home" },
            { "@type": "ListItem", position: 2, name: "Services" }
          ]
        }}
      />
      <section className="border-b hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="overline mb-4">Services</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            Sourcing services, <span className="gold-text">unbundled.</span>
          </h1>
          <p className="mt-6 text-[#3A4759] max-w-2xl">
            Whether you need a one-time supplier validation or a quarterly retainer that runs your
            India &amp; Asia sourcing, EEC scales to your operating model.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="border hairline p-8 bg-surface flex gap-6">
              <Icon size={28} className="text-[#C9A23F] mt-1 shrink-0" />
              <div>
                <div className="font-display text-2xl text-[#012D76] mb-2">{t}</div>
                <div className="text-[#3A4759] leading-relaxed">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Engagement tiers</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl mb-12">
            Pick the right depth of partnership.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <div key={p.id} className={`relative border ${p.popular ? "border-[#C9A23F]" : "border-[#E5EBF2]"} bg-elevated p-8 flex flex-col`}>
                {p.popular && (
                  <div className="absolute -top-3 left-8 bg-[#C9A23F] text-black text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                    Most chosen
                  </div>
                )}
                <div className="overline mb-2">{p.cadence}</div>
                <div className="font-display text-3xl text-[#012D76] mb-2">{p.name}</div>
                <div className="text-[#3A4759] text-sm mb-6">{p.tagline}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#3A4759]">
                      <Check size={16} className="text-[#C9A23F] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {isAuthed ? (
                  <Link to={dashboardHref} className={p.popular ? "eec-btn-primary" : "eec-btn-secondary"} data-testid={`services-pricing-cta-dashboard-${p.id}`}>
                    Go to dashboard <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <Link to="/buyer/intake" className={p.popular ? "eec-btn-primary" : "eec-btn-secondary"} data-testid={`services-pricing-cta-${p.id}`}>
                    {p.cta} <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.32em] text-[#6B7280]" data-testid="services-pricing-disclaimer">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A23F] align-middle mr-3"></span>
            Pricing shared during discovery call
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A23F] align-middle ml-3"></span>
          </p>
        </div>
      </section>
    </div>
  );
}
