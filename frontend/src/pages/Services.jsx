import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Search, ClipboardCheck, FileBarChart, Anchor } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Seo from "@/components/Seo";

const SERVICES = [
  { icon: Search, t: "Supplier Identification and Qualification", d: "We identify and evaluate manufacturers that align with your product specifications, quality requirements, production capabilities and commercial objectives, helping you build a trusted supplier base." },
  { icon: ClipboardCheck, t: "Supplier Verification and Assessment", d: "Our team supports supplier verification through capability assessments, documentation reviews and compliance evaluations, providing buyers with greater confidence during supplier selection." },
  { icon: FileBarChart, t: "Supply Chain Coordination", d: "We help coordinate sourcing activities between buyers and suppliers, supporting efficient communication, documentation and project management across international supply chains." },
  { icon: Anchor, t: "Procurement Support", d: "EEC supports procurement activities including supplier coordination, commercial discussions, sourcing strategy and communication throughout the procurement process." },
];

const PRICING = [
  {
    id: "scout",
    cadence: "One-time engagement",
    name: "Scout",
    tagline: "Ideal for businesses seeking new sourcing opportunities or evaluating potential manufacturers.",
    features: ["Supplier identification", "Initial supplier qualification", "Manufacturer profiling", "Market insights", "Preliminary sourcing recommendations"],
    cta: "Start with Scout",
  },
  {
    id: "engage",
    cadence: "Per sourcing project",
    name: "Engage",
    tagline: "End-to-end sourcing with negotiated terms.",
    features: ["Full sourcing brief deployment and RFQ to qualified bench", "Up to 10 qualified suppliers, 3 deep-dive factory audits", "On-ground factory visit at one location", "Negotiated MOQ, payment terms and lead times", "Sample QC and third-party AQL pre-shipment inspection", "Open-book landed cost and duty optimisation"],
    cta: "Submit a sourcing brief",
    popular: true,
  },
  {
    id: "embed",
    cadence: "Quarterly retainer",
    name: "Embed",
    tagline: "For organisations seeking ongoing sourcing support across multiple products, suppliers or international markets.",
    features: ["Dedicated sourcing support", "Multi supplier management", "Procurement planning", "Supply chain collaboration", "Long term sourcing partnership"],
    cta: "Book a discovery call",
  },
];

const FAQ = [
  ["Which engagement option is right for me?", "EEC offers procurement and sourcing services designed to meet different business needs. Whether you require supplier discovery, support for a specific procurement or sourcing project or ongoing procurement assistance, our team will recommend an engagement approach based on your sourcing objectives."],
  ["How long does a sourcing project take?", "Project timelines vary depending on product complexity, supplier availability, technical requirements and buyer specifications. Our team works closely with clients to establish realistic timelines and provide regular updates throughout the sourcing process."],
  ["Does EEC support freight and logistics?", "EEC can assist with procurement coordination and facilitate communication with logistics and supply chain partners where required. The level of support depends on the scope of the sourcing engagement."],
  ["Can EEC source multiple product categories?", "Yes. EEC supports sourcing across multiple industries and product categories, helping businesses manage sourcing across verified manufacturers in different regions and markets."],
  ["Can I expand my engagement as my sourcing needs grow?", "Yes. Many clients begin with a focused sourcing requirement and expand into broader procurement support as their business grows. Our services are designed to scale alongside your sourcing requirements."],
  ["Does EEC coordinate supplier verification?", "Yes. Where appropriate, EEC supports supplier verification through capability assessments, documentation reviews and coordination with recognised third party inspection and verification partners."],
];

export default function Services() {
  const [pricing, setPricing] = useState(PRICING);
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref =
    isAuthed && user.role === "admin" ? "/admin"
    : isAuthed && user.role === "supplier" ? "/supplier"
    : "/buyer";
  useEffect(() => {
    api.get("/pricing").then(({ data }) => {
      if (Array.isArray(data) && data.length) setPricing(data);
    }).catch(() => {});
  }, []);

  return (
    <div data-testid="services-page">
      <Seo
        title="India Sourcing Services — Discovery, Audits, Landed Cost & Shipment | EEC"
        description="EEC provides supplier identification, supplier qualification, procurement and sourcing strategy for institutional buyers worldwide. Singapore headquartered with specialised expertise across India and Asia."
        canonical="https://eectrade.com/services"
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
          <div className="overline mb-4">Our services</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            Strategic Procurement and Sourcing Services
          </h1>
          <p className="mt-6 text-[#3A4759] max-w-2xl">
            Whether you are sourcing a new product, expanding your supplier base or building a long term procurement strategy, EEC provides sourcing solutions tailored to your business. Headquartered in Singapore with a global supplier network and specialised expertise across India and Asia, we help businesses identify reliable manufacturing partners and manage sourcing efficiently.
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
            Procurement and sourcing support for every stage of your procurement journey.
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
            Pricing is tailored to the requirements of each sourcing project. Please contact our team to discuss your sourcing objectives.
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A23F] align-middle ml-3"></span>
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light mb-8">
            Frequently asked questions about EEC services
          </h2>
          <div className="border hairline bg-surface overflow-hidden">
            {FAQ.map(([q, a], idx) => (
              <div key={q} className={`${idx !== FAQ.length - 1 ? "border-b hairline" : ""} grid grid-cols-1 md:grid-cols-[36%_1fr]`}>
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
