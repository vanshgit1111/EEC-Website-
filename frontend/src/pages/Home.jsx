import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Check } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Seo from "@/components/Seo";

const HERO_IMG = "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=900&h=900";

const PROCESS_STEPS = [
  { n: "01", title: "Discovery Call", desc: "A free 20-minute call to map your category, target landed cost, order volume, compliance requirements and timelines. No commitment required." },
  { n: "02", title: "Sourcing Sprint", desc: "We shortlist 5–8 vetted suppliers, coordinate samples, run negotiations and deliver a decision-ready sourcing memo within 21 days." },
  { n: "03", title: "Negotiate & Sample", desc: "We negotiate MOQ, payment terms and lead times — and coordinate sample QC plus third-party AQL pre-shipment inspections." },
  { n: "04", title: "Ship & Optimize", desc: "We coordinate logistics, customs clearance and post shipment quality control while helping buyers improve procurement efficiency and optimise landed costs through disciplined sourcing and supply chain coordination." },
];

const TRUST = ["BSCI", "SEDEX", "SA8000", "SMETA", "Oeko-Tex 100", "GOTS", "FSSAI", "HACCP", "ISO 22000", "FSSC 22000", "BRC/BRCGS", "IFS Food", "GlobalG.A.P.", "GRASP", "GMP", "ISO 13485", "ISO 9001", "NPOP", "EU Organic", "REACH"];

const HOME_CATEGORIES = [
  { id: "food", name: "Food Commodities", tagline: "Rice, sugar, pulses, edible oils, spices.", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Food", alt: "Eggs stacked in a tray — Food Commodities sourcing from India including rice, pulses and edible oils" },
  { id: "processed", name: "Processed & Packaged Foods", tagline: "Snacks, beverages, frozen foods, ready meals.", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Processed", alt: "Mixed confectionery and packaged snacks — Processed and packaged food export sourcing from India" },
  { id: "fresh", name: "Fresh & Agricultural Products", tagline: "Fruits, vegetables, organic produce", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Fresh", alt: "Fresh vegetables on a market display — Fresh and agricultural produce sourcing from India" },
  { id: "healthcare", name: "Healthcare & Hospital Supplies", tagline: "Medical devices, pharmaceuticals, hospital consumables.", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Healthcare", alt: "Healthcare laboratory and medical supplies — hospital equipment, pharmaceuticals and consumables sourcing" },
  { id: "home-textile", name: "Home Textile, Apparel & Hospitality Products", tagline: "Bed linen, towels, uniforms, hotel amenities.", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Home Textiles", alt: "Apparel and textile production — home textiles, uniforms and hospitality product sourcing" },
  { id: "eco", name: "Eco-Friendly, Sustainable & Organic Products", tagline: "Biodegradable packaging, organic textiles, green alternatives.", image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1200&q=80", cta: "Brief us on Eco-Friendly", alt: "Sustainable packaging and biodegradable products — eco-friendly and organic product sourcing India" },
];

const HOME_PRICING = [
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

const COMPARE = [
  ["Supplier discovery", "Marketplace browsing", "Curated, audited bench"],
  ["QC", "Self-managed", "EEC pre-shipment AQL + third-party inspection"],
  ["Commercials", "Vendor-published price", "Open-book negotiated — every cost layer disclosed"],
  ["Escalations", "Email chains with no clear owner", "Dedicated EEC commercial lead"],
  ["Cost trajectory", "Price creep each cycle", "Quarterly cost-out program (avg. 9.1% Year 1)"],
];

const FAQ = [
  ["What is Elan Exports Consultancy?", "Elan Exports Consultancy (EEC) is a Singapore headquartered global sourcing consultancy that connects buyers with verified manufacturers worldwide, backed by specialised expertise and an extensive sourcing network across India and Asia. EEC delivers open-book commercials and predictable shipments. 20 Years of Founder experience and Incorporated on 13 January 2025 (UEN: 202501728W), EEC acts as an embedded sourcing arm for global buyers."],
  ["How is EEC different from a sourcing marketplace?", "EEC is a consultancy, not a marketplace. Marketplaces earn revenue from supplier listings or transaction commissions. EEC charges buyers a service fee based on engagement tier. EEC negotiates on open-book terms. Suppliers are recommended based on quality and fit, with no commercial conflict of interest."],
  ["What is landed cost, and how does EEC model it?", "Landed cost is the total cost of a product at the destination warehouse, including factory price (FOB), freight, insurance, import duties, customs clearance, and last-mile delivery. EEC provides open-book landed cost modelling for every sourcing project before the buyer commits to a supplier. This eliminates hidden margins and gives procurement teams an accurate, comparable basis for supplier decisions across categories and geographies."],
  ["How are suppliers vetted by EEC?", "We take a focused approach to sourcing. Every supplier in our network is carefully vetted through due diligence and ongoing evaluation, ensuring global buyers have access to reliable manufacturers, transparent commercial practices, and dependable supply chains. The vetting process covers IEC registration, GST filing, financial checks, factory audits, and compliance documentation. Every approved supplier has a written EEC audit report on file. EEC currently works with 70+ verified suppliers across active categories."],
  ["What product categories does EEC source?", "EEC operates six active sourcing desks: Food Commodities (rice, sugar, pulses, edible oils, spices), Processed and Packaged Foods (snacks, beverages, frozen foods, ready meals), Fresh and Agricultural Products (fruits, vegetables, organic produce), Healthcare & Hospital Supplies (medical devices, pharmaceuticals, hospital consumables), Home Textile, Apparel & Hospitality Products (bed linen, towels, uniforms, hotel amenities), and Eco-Friendly, Sustainable & Organic Products (biodegradable packaging, organic textiles)."],
  ["What does EEC's 94% OTIF rate mean?", "OTIF stands for On-Time, In-Full — the percentage of shipments delivered on the agreed date and in the agreed quantity. EEC maintains a 94% OTIF rate across all active buyer programs as of Q2 2026. This is achieved through pre-shipment AQL inspections, shipment milestone tracking in the buyer portal, and proactive logistics coordination. Industry average OTIF for self-managed India sourcing is approximately 72–78%."],
  ["How does EEC price its services?", "EEC pricing varies by engagement tier. Scout is a fixed-fee one-time project for buyers evaluating a new category or geography. Engage (per-project) and Embed (quarterly retainer) are priced during the discovery call based on category complexity, volume, and sourcing geography. EEC does not charge suppliers listing or activation fees at any stage. All revenue comes from buyer service fees only. Pricing is shared at the discovery call and is not published publicly."],
  ["Is EEC registered in Singapore?", "Yes. Elan Exports Consultancy Pte. Ltd. is incorporated in Singapore under UEN 202501728W, registered on 13 January 2025 at 36 Jalan Sampurna, Singapore 268304. The company is an exempt private company limited by shares and is headquartered in Singapore. Procurement, sourcing, and operations teams are based in India."],
  ["What countries does EEC source from?", "EEC sources from India, Asia, and select global markets. India remains the primary sourcing market across food commodities, processed and packaged foods, fresh and agricultural products, healthcare and hospital supplies, home textile, apparel and hospitality products, and eco-friendly products. EEC also works with verified manufacturers in Vietnam, Bangladesh, Indonesia, Thailand, and other countries based on category requirements. Every supplier in the network is verified before any RFQ is deployed to a buyer."],
  ["How do I start working with EEC as a buyer?", "The fastest way to start is a free 20-minute discovery call with no commitment required. EEC maps your sourcing category, target landed cost, compliance requirements, and timelines. After the call, EEC recommends the appropriate engagement tier and provides a scope and pricing outline within 2 working days. Buyers can also submit a sourcing brief directly through the EEC Buyer Portal, which takes under 5 minutes to complete."],
];

export default function Home() {
  const [categories, setCategories] = useState(HOME_CATEGORIES);
  const [pricing, setPricing] = useState(HOME_PRICING);
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref =
    isAuthed && user.role === "admin" ? "/admin"
    : isAuthed && user.role === "supplier" ? "/supplier"
    : "/buyer";

  useEffect(() => {
    api.get("/categories").then(({ data }) => {
      if (Array.isArray(data) && data.length) setCategories(data);
    }).catch(() => {});
    api.get("/pricing").then(({ data }) => {
      if (Array.isArray(data) && data.length) setPricing(data);
    }).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      <Seo
        title="Elan Exports Consultancy | Singapore Headquartered | Global Buyer & Supplier Network | Exclusive India & Asia Sourcing"
        description="EEC is a Singapore Headquartered sourcing consultancy acting as the embedded procurement arm for global buyers sourcing from India and Asia. 70+ suppliers. Open-book landed cost. Not a marketplace."
        canonical="https://eectrade.com/"
        ogTitle="Elan Exports Consultancy | Singapore Headquartered | Global Buyer & Supplier Network | Exclusive India & Asia Sourcing"
        ogDescription="Singapore Headquartered sourcing consultancy. 70+ vetted suppliers across India & Asia. Verified factories, open-book commercials, 94% OTIF. We operate as your embedded sourcing arm — not a marketplace."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": ["Organization", "ProfessionalService"],
            "@id": "https://eectrade.com/#organization",
            name: "Elan Exports Consultancy",
            legalName: "Elan Exports Consultancy Pte. Ltd.",
            alternateName: ["EEC", "Élan Exports Consultancy"],
            url: "https://eectrade.com",
            description: "Elan Exports Consultancy (EEC) is a Singapore Headquartered sourcing consultancy (UEN: 202501728W) acting as an embedded procurement arm for global buyers sourcing from India and Asia.",
            foundingDate: "2025-01-13",
            taxID: "202501728W",
            areaServed: ["IN", "VN", "BD", "ID", "TH", "SG"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://eectrade.com/#website",
            url: "https://eectrade.com",
            name: "Elan Exports Consultancy",
            description: "Singapore Headquartered sourcing consultancy for India and Asia. 70+ vetted suppliers across six categories.",
            publisher: { "@id": "https://eectrade.com/#organization" },
            inLanguage: "en",
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Start Sourcing from India with EEC",
            totalTime: "P21D",
            step: PROCESS_STEPS.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.desc,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
        ]}
      />
      {/* HERO — Light editorial */}
      <section className="relative overflow-hidden grain pt-6 lg:pt-10" data-testid="hero-section">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[rgba(201,162,75,0.06)] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pb-20 lg:pb-28 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <span className="overline">Singapore Headquartered</span>
                <span className="overline">India operations</span>
              </div>
              <h1 className="font-display text-[44px] leading-[1.02] sm:text-6xl lg:text-7xl mt-6 text-[#012D76] tracking-tight">
                Cut sourcing risk,<br />
                <em className="italic font-normal text-[#012D76]/90">landed cost, and</em><br />
                supplier uncertainty.
              </h1>
              <p className="mt-8 text-base lg:text-lg text-[#3A4759] leading-relaxed max-w-xl">
                Singapore headquartered, EEC is a procurement and sourcing consultancy that connects enterprise buyers with verified manufacturers across India and Asia. Through supplier verification and open book commercials, EEC supports transparent sourcing and operates as an embedded sourcing partner, not a marketplace.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                {isAuthed ? (
                  <>
                    <Link to={dashboardHref} className="eec-btn-primary group" data-testid="hero-cta-dashboard">
                      Go to dashboard <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link to="/buyer/intake" className="eec-btn-secondary" data-testid="hero-cta-new-brief">
                      New sourcing brief <ChevronRight size={16} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/buyer/intake" className="eec-btn-primary group" data-testid="hero-cta-buyer">
                      Submit a sourcing brief <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link to="/buyer/intake" className="eec-btn-secondary" data-testid="hero-cta-supplier">
                      New sourcing brief <ChevronRight size={16} />
                    </Link>
                  </>
                )}
              </div>
              <p className="mt-8 text-xs text-[#6B7280] max-w-md leading-relaxed">
                Founded by ex-procurement leaders with 20+ years of combined experience. Incorporated in Singapore, January 2025 (UEN: 202501728W).
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#C9A23F]/50 pointer-events-none" />
                <img
                  alt="Shipping containers in a port — India and Asia supply chain operations managed by Elan Exports Consultancy"
                  className="w-full h-[420px] lg:h-[540px] object-cover grayscale-[10%]"
                  src={HERO_IMG}
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/95 backdrop-blur-md p-5 border-l-2 border-[#C9A23F]">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#A6831F]">A buyer-first sourcing desk</p>
                  <p className="mt-2 font-display text-xl text-[#012D76] leading-tight">
                    Vetted suppliers. Open-book cost. Shipments that actually arrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / TRUST BAR */}
      <section className="border-y hairline bg-[#FFFFFF]" data-testid="trust-bar">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E5EBF2]">
            {[
              { k: "20+", v: "Years of combined founder experience in procurement" },
              { k: "480+", v: "Suppliers vetted across India & Asia" },
            { k: "14", v: "Countries served end-to-end" },
            { k: "6", v: "Sourcing verticals covered" },
          ].map((s, i) => (
            <div key={s.k} className={`py-8 lg:py-10 px-5 lg:px-8 ${i === 0 ? "pl-0 lg:pl-0" : ""}`} data-testid={`stat-${i}`}>
              <div className="font-display text-3xl lg:text-5xl text-[#012D76]">{s.k}</div>
              <p className="text-xs lg:text-sm text-[#6B7280] mt-2 tracking-wide leading-snug">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 lg:py-28" data-testid="categories-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="overline">What we source</span>
              <h2 className="font-display text-4xl lg:text-5xl text-[#012D76] mt-5 max-w-2xl tracking-tight">
                Six categories. <em className="italic font-normal">No marketplace clutter.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm lg:text-base text-[#3A4759] leading-relaxed">
              We take a focused approach to procurement and sourcing. Every supplier in our network undergoes due diligence and ongoing evaluation, helping enterprise buyers connect with verified manufacturers while supporting transparent commercial practices and dependable supply chains across India and Asia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5EBF2]">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                to="/categories"
                className="group bg-[#FFFFFF] hover:bg-[#F5F9FC] transition-colors duration-500 p-7 lg:p-9"
                data-testid={`category-card-${c.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-[#EFF4F9]">
                  <img
                    src={c.image}
                    alt={c.alt || c.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-[#012D76]">{c.name}</h3>
                  <span className="text-xs text-[#6B7280] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-sm text-[#3A4759] leading-relaxed">{c.tagline}</p>
                <span className="inline-flex items-center gap-1.5 mt-6 text-sm text-[#012D76] font-medium">
                  {c.cta || `Brief us on ${c.name.split(" ")[0]}`} <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — dark contrast band */}
      <section className="bg-[#012D76] text-[#FFFFFF] py-20 lg:py-28 grain" data-testid="process-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 text-[11px] uppercase tracking-[0.22em] text-white/80 bg-white/[0.03]">
              <span className="h-1 w-1 rounded-full bg-[#C9A23F]" />
              How it works
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mt-5 tracking-tight">
              A clear, <em className="italic font-normal text-[#DBB85A]">four-step</em> engagement.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="bg-[#012D76] p-8 lg:p-10" data-testid={`process-step-${s.n}`}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-[#C9A23F] italic">{s.n}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">Step</span>
                </div>
                <h3 className="font-display text-2xl mt-8">{s.title}</h3>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col sm:flex-row gap-3">
            <Link to="/buyer/intake" className="inline-flex items-center justify-center gap-2 bg-[#C9A23F] text-[#012D76] hover:bg-[#DBB85A] h-14 px-6 text-sm font-medium transition-colors" data-testid="process-cta-book">
              Book a free 20-min discovery call <ArrowUpRight size={16} />
            </Link>
            <Link to="/for-buyers" className="inline-flex items-center justify-center gap-2 text-[#FFFFFF] hover:bg-white/10 h-14 px-6 text-sm font-medium transition-colors">
              See the buyer playbook
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECT SOURCING vs EEC COMPARISON */}
      <section className="py-20 lg:py-28 border-t hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <span className="overline">Direct sourcing vs EEC</span>
          <h2 className="font-display text-4xl lg:text-5xl text-[#012D76] mt-5 max-w-3xl tracking-tight mb-14">
            Why mature procurement teams switch from direct sourcing.
          </h2>
          <div className="border hairline overflow-hidden bg-[#FFFFFF]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F5F9FC] text-xs uppercase tracking-[0.2em] text-[#3A4759]">
                  <th className="p-5 text-left">Dimension</th>
                  <th className="p-5 border-l hairline text-left">Direct sourcing</th>
                  <th className="p-5 border-l hairline text-left text-[#C9A23F]">With EEC</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([row, a, b]) => (
                  <tr key={row} className="border-t hairline">
                    <td className="p-5 text-[#012D76]">{row}</td>
                    <td className="p-5 border-l hairline text-[#6B7280]">{a}</td>
                    <td className="p-5 border-l hairline text-[#012D76]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28" data-testid="pricing-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <span className="overline">Engagement tiers</span>
          <h2 className="font-display text-4xl lg:text-5xl text-[#012D76] mt-5 max-w-3xl tracking-tight mb-14">
            Three ways to engage. From validation to <em className="italic font-normal">embedded operations.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-[#E5EBF2]">
            {pricing.map((p) => (
              <div
                key={p.id}
                className={`relative bg-[#FFFFFF] p-8 lg:p-10 flex flex-col ${p.popular ? "lg:scale-[1.02] shadow-[0_20px_60px_-20px_rgba(26,29,35,0.18)]" : ""}`}
                data-testid={`pricing-card-${p.id}`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-8 bg-[#C9A23F] text-[#012D76] text-[10px] tracking-[0.22em] uppercase font-semibold px-3 py-1">
                    Most chosen
                  </div>
                )}
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#6B7280]">{p.cadence}</span>
                <div className="font-display text-3xl text-[#012D76] mt-3">{p.name}</div>
                <div className="text-[#3A4759] text-sm mt-3 mb-7">{p.tagline}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#3A4759]">
                      <Check size={16} className="text-[#C9A23F] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {isAuthed ? (
                  <Link
                    to={dashboardHref}
                    className={p.popular ? "eec-btn-primary" : "eec-btn-secondary"}
                    data-testid={`pricing-cta-dashboard-${p.id}`}
                  >
                    Go to dashboard <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <Link
                    to="/buyer/intake"
                    className={p.popular ? "eec-btn-primary" : "eec-btn-secondary"}
                    data-testid={`pricing-cta-${p.id}`}
                  >
                    {p.cta} <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.32em] text-[#6B7280]" data-testid="home-pricing-disclaimer">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A23F] align-middle mr-3"></span>
            Pricing is tailored to the requirements of each sourcing project. Please contact our team to discuss your sourcing objectives.
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A23F] align-middle ml-3"></span>
          </p>
        </div>
      </section>
      <section className="bg-[#F5F9FC] py-14 border-y hairline">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#012D76]/75">Compliance screened for</p>
            <p className="hidden md:block text-xs text-[#6B7280]">Audit reports available on request</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
              {[...TRUST, ...TRUST].map((t, i) => (
                <span key={i} className="font-display text-2xl lg:text-3xl text-[#012D76]/40 italic">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DUAL FINAL CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          {isAuthed ? (
            <div className="border hairline bg-[#FFFFFF] p-10 lg:p-14 text-center" data-testid="closing-cta-authed">
              <p className="text-xs uppercase tracking-[0.22em] text-[#A6831F]">Welcome back, {user.name?.split(" ")[0]}</p>
              <h3 className="font-display text-3xl lg:text-4xl text-[#012D76] mt-4 tracking-tight max-w-2xl mx-auto">
                Pick up where you left off.
              </h3>
              <p className="text-[#3A4759] mt-4 text-sm leading-relaxed max-w-xl mx-auto">
                  Track your active briefs, supplier applications, documents and shipment milestones — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link to={dashboardHref} className="eec-btn-primary" data-testid="closing-cta-dashboard">
                  Go to dashboard <ArrowUpRight size={16} />
                </Link>
                {user.role === "buyer" && (
                  <Link to="/buyer/intake" className="eec-btn-secondary" data-testid="closing-cta-new-brief">
                    Submit another brief <ChevronRight size={16} />
                  </Link>
                )}
                {user.role === "supplier" && (
                  <Link to="/supplier/apply" className="eec-btn-secondary" data-testid="closing-cta-new-application">
                    Submit another application <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-px bg-[#E5EBF2]">
              <Link to="/buyer/intake" className="group bg-[#FFFFFF] p-10 lg:p-14 hover:bg-[#F5F9FC] transition-colors duration-500" data-testid="closing-cta-buyer">
                <p className="text-xs uppercase tracking-[0.22em] text-[#A6831F]">For Buyers</p>
                <h3 className="font-display text-3xl lg:text-4xl text-[#012D76] mt-4 tracking-tight">
                  Book a free 20-minute sourcing call.
                </h3>
                <p className="text-[#3A4759] mt-4 text-sm leading-relaxed max-w-md">
                  No commitment. EEC maps your category, target landed cost, compliance requirements and a realistic 90-day sourcing plan.
                </p>
                <span className="inline-flex items-center gap-2 mt-8 text-[#012D76] font-medium">
                  Book now <ArrowUpRight size={14} />
                </span>
              </Link>
              <Link to="/supplier/apply" className="group bg-[#FFFFFF] p-10 lg:p-14 hover:bg-[#F5F9FC] transition-colors duration-500" data-testid="closing-cta-supplier">
                <p className="text-xs uppercase tracking-[0.22em] text-[#A6831F]">For Suppliers</p>
                <h3 className="font-display text-3xl lg:text-4xl text-[#012D76] mt-4 tracking-tight">
                  Apply to the EEC Supplier Network.
                </h3>
                <p className="text-[#3A4759] mt-4 text-sm leading-relaxed max-w-md">
                  Access institutional buyers across 14 countries. Clear sourcing briefs, faster payment terms and recurring export programs — not one-off RFQs.
                </p>
                <span className="inline-flex items-center gap-2 mt-8 text-[#012D76] font-medium">
                  Apply now <ArrowUpRight size={14} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="font-display text-4xl lg:text-5xl text-[#012D76] tracking-tight mb-12">
            Frequently asked questions
          </h2>
          <div className="border hairline bg-[#FFFFFF] overflow-hidden">
            {FAQ.map(([q, a], idx) => (
              <div key={q} className={`grid grid-cols-1 md:grid-cols-[36%_1fr] ${idx !== FAQ.length - 1 ? "border-b hairline" : ""}`}>
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
