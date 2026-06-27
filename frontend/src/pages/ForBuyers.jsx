import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { useAuth } from "@/context/AuthContext";

const HERO_BG = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80";

const WHY = [
  {
    title: "Verified factories only",
    body: "IEC, GST and financial sanity checks — plus a physical or virtual on-ground factory audit before any RFQ goes out.",
  },
  {
    title: "Landed cost transparency",
    body: "Open-book FOB, duty, freight and last-mile modelling. Every cost layer disclosed before commitment. No hidden margins.",
  },
  {
    title: "Lead-time discipline",
    body: "Third-party AQL pre-shipment inspections and shipment milestones tracked in real time in your EEC Buyer Portal. 94% OTIF rate across active programs.",
  },
  {
    title: "Single point of escalation",
    body: "One dedicated commercial lead. One QC lead. One escalation path across all suppliers and all categories — no more chasing email chains.",
  },
];

const COMPARE = [
  ["Supplier discovery", "Marketplace browsing — no audit, no verification", "Curated, audited bench — IEC, GST and factory audit required"],
  ["Quality control", "Self-managed — buyer coordinates inspection independently", "EEC pre-shipment AQL + independent third-party inspection"],
  ["Commercials", "Vendor-published price — margins and layers undisclosed", "Open-book negotiated — every cost layer disclosed before commitment"],
  ["Escalations", "Email chains with no clear owner or escalation path", "Dedicated EEC commercial lead — single point of contact"],
  ["Cost trajectory", "Price creep each renewal cycle", "Quarterly cost-out program — average 9.1% landed cost reduction Year 1"],
];

const TIER_CARDS = [
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
    tagline: "Strategic Procurement Partnership.",
    features: ["Dedicated sourcing support", "Multi supplier management", "Procurement planning", "Supply chain collaboration", "Long term sourcing partnership"],
    cta: "Book a discovery call",
  },
];

const FAQ = [
  ["What does Elan Exports Consultancy (EEC) do for buyers?", "Elan Exports Consultancy (EEC) is a Singapore headquartered global sourcing consultancy that helps buyers identify, evaluate and source from verified manufacturers worldwide. With particular expertise across India and Asia, we support supplier identification, qualification, procurement coordination and sourcing strategy to help businesses build reliable, long term supply partnerships."],
  ["Who does EEC work with?", "EEC works with mid sized businesses, institutional buyers, retailers, importers, distributors and procurement teams across a wide range of industries. We tailor our sourcing approach to each client's procurement objectives, product requirements and business needs."],
  ["What industries does EEC specialise in?", "EEC supports sourcing across Food Commodities, Processed & Packaged Foods, Fresh & Agricultural Products, Healthcare & Hospital Supplies, Home Textile, Apparel & Hospitality Products, and Eco-Friendly, Sustainable & Organic Products. We also support custom sourcing requirements based on buyer specifications."],
  ["How does EEC qualify suppliers?", "EEC evaluates suppliers based on manufacturing capability, production capacity, export readiness, quality management systems, compliance standards and operational transparency. Our qualification process helps ensure buyers are introduced to reliable manufacturing partners that align with their sourcing requirements."],
  ["Can EEC source from countries other than India?", "Yes. EEC works with verified manufacturers worldwide. While we have extensive sourcing expertise and a strong supplier network across India and Asia, we also support sourcing from other regions based on product requirements, buyer specifications and sourcing strategy."],
  ["How does EEC support quality and compliance?", "Quality and compliance requirements vary by product category and buyer specifications. Where required, EEC coordinates supplier verification, product evaluations and independent third-party inspections through recognised inspection partners, helping buyers source with confidence."],
  ["What certifications does EEC consider during supplier evaluation?", "Certification requirements depend on the product category and destination market. EEC reviews relevant quality, food safety, sustainability, social compliance and regulatory certifications where applicable, helping buyers identify suppliers that meet their procurement and compliance requirements."],
  ["What is a sourcing brief?", "A sourcing brief is a document that outlines a buyer's product specifications, quality expectations, commercial requirements and sourcing objectives. It enables our sourcing specialists to identify manufacturers best suited to the buyer's procurement needs."],
  ["Does EEC guarantee suppliers or purchase outcomes?", "No. EEC identifies and qualifies suppliers based on buyer requirements and supports the sourcing process through supplier evaluation and procurement coordination. Final supplier selection, commercial negotiations and purchasing decisions remain with the buyer."],
  ["Why choose Elan Exports Consultancy?", "EEC combines global sourcing expertise with strong supplier relationships, particularly across India and Asia. Headquartered in Singapore, we help businesses simplify international procurement through verified manufacturers, transparent sourcing practices and long-term procurement partnerships, enabling buyers to source with greater confidence."],
];

export default function ForBuyers() {
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref = isAuthed && user.role === "admin" ? "/admin" : isAuthed && user.role === "supplier" ? "/supplier" : "/buyer";

  return (
    <div data-testid="for-buyers-page">
      <Seo
        title="Global Sourcing Consultancy | Singapore Headquartered | India & Asia Expertise | EEC"
        description="EEC helps institutional buyers source from verified manufacturers worldwide. Headquartered in Singapore, we specialise in supplier qualification, procurement and sourcing across India and Asia."
        canonical="https://eectrade.com/for-buyers"
        ogTitle="Global Sourcing Consultancy | Singapore Headquartered | India & Asia Expertise | EEC"
        ogDescription="Partner with EEC to identify verified manufacturers, streamline procurement and build long term sourcing partnerships. Singapore headquartered with specialised expertise across India and Asia."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://eectrade.com" },
              { "@type": "ListItem", position: 2, name: "For Buyers", item: "https://eectrade.com/for-buyers" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://eectrade.com/for-buyers#service",
            name: "India & Asia Sourcing Consultancy for Global Buyers",
            serviceType: "Procurement Outsourcing",
            provider: { "@id": "https://eectrade.com/#organization" },
            description: "EEC provides end-to-end sourcing services for global buyers purchasing from India and Asia, including supplier discovery and qualification, factory auditing, open-book commercial negotiation, third-party AQL quality control, and shipment management across six product categories.",
            areaServed: ["IN", "VN", "BD", "ID", "TH"],
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/80 to-[#FFFFFF]/20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <div className="overline mb-4">For Buyers</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            Outsource sourcing. <span className="gold-text font-medium">Not accountability.</span>
          </h1>
          <p className="mt-6 text-[#3A4759] max-w-2xl text-lg">
            For procurement leaders running multi-category India & Asia programs who need audited supply, open-book commercials and predictable shipments.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/buyer/intake" className="eec-btn-primary" data-testid="buyers-cta-intake">
              Submit a sourcing brief <ArrowUpRight size={16} />
            </Link>
            <Link to="/services" className="eec-btn-secondary">Explore services</Link>
          </div>
        </div>
      </section>

      <section className="py-14 border-b hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#3A4759] leading-relaxed max-w-4xl">
            EEC is a Singapore headquartered global sourcing consultancy that connects institutional buyers with verified manufacturers worldwide. Our expertise in supplier qualification, strategic sourcing and procurement, with specialised focus across India and Asia, helps businesses build transparent, long term supply chain partnerships.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Why EEC</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl mb-12">
            Built for procurement teams, not for browsing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map(({ title, body }) => (
              <div key={title} className="border hairline p-8 bg-surface">
                <div className="font-display text-xl text-[#012D76] mt-1 mb-2">{title}</div>
                <p className="text-sm text-[#3A4759] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Direct sourcing vs EEC</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl mb-12">
            Why mature procurement teams switch from direct sourcing.
          </h2>
          <div className="border hairline overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-elevated text-xs uppercase tracking-[0.2em] text-[#3A4759]">
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

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="overline mb-3">Buyer Portal</div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light">
              Track briefs, RFQs, samples and shipments in one place.
            </h2>
            <p className="mt-4 text-[#3A4759] max-w-xl">
              The EEC Buyer Portal gives you live visibility into every active sourcing brief, supplier shortlist, QC sample status and shipment milestone — all in one place. No spreadsheets. No email chasing. Submit a brief in under 5 minutes and our team responds within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/buyer/intake" className="eec-btn-primary" data-testid="buyers-cta-portal">
                Submit a brief <ArrowUpRight size={16} />
              </Link>
              {isAuthed ? (
                <Link to={dashboardHref} className="eec-btn-secondary" data-testid="buyers-cta-dashboard">
                  Go to dashboard <ArrowUpRight size={16} />
                </Link>
              ) : (
                <Link to="/login" className="eec-btn-secondary" data-testid="buyers-cta-signin">Go to dashboard <ArrowUpRight size={16} /></Link>
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border hairline p-6 bg-surface">
              <div className="flex items-center justify-between mb-6">
                <div className="overline">Active brief · Preview</div>
                <span className="text-[#C9A23F] text-xs tracking-[0.2em] uppercase">Preview</span>
              </div>
              <div className="text-sm text-[#3A4759] space-y-3">
                <div className="flex justify-between"><span className="text-[#6B7280]">Category</span><span>Home textiles</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Volume</span><span>120K units / yr</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Suppliers shortlisted</span><span>6</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">QC samples received</span><span>3</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Landed cost vs target</span><span className="text-[#C9A23F]">-8.2%</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#012D76]/75">Compliance screened for</p>
            <p className="hidden md:block text-xs text-[#6B7280]">Audit reports available on request</p>
          </div>
          <div className="overflow-hidden whitespace-nowrap text-[#012D76]/40 font-display text-2xl lg:text-3xl italic animate-marquee">
            BSCI · SEDEX · SA8000 · SMETA · Oeko-Tex 100 · GOTS · FSSAI · HACCP · ISO 22000 · FSSC 22000 · BRC/BRCGS · IFS Food · GlobalG.A.P. · GRASP · GMP · ISO 13485 · ISO 9001 · NPOP · EU Organic · REACH
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="entry mb-8">
            <div className="entry-label">H2</div>
            <div className="entry-body"><div className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light">Frequently asked questions about EEC sourcing services</div></div>
          </div>
          <div className="border hairline overflow-hidden bg-surface">
            {FAQ.map(([q, a], idx) => (
              <div key={q} className={`grid grid-cols-1 md:grid-cols-[36%_1fr] ${idx !== FAQ.length - 1 ? "border-b hairline" : ""}`}>
                <div className="p-5 md:p-6 font-medium text-[#012D76]">{q}</div>
                <div className="p-5 md:p-6 text-[#3A4759] leading-relaxed">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#012D76] text-white grain">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="overline mx-auto mb-4">Get started</div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">Response within two working days.</h2>
          <p className="mt-4 text-white/75">No commitment required. The discovery call is free.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/buyer/intake" className="eec-btn-accent">Submit a sourcing brief →</Link>
            <Link to="/buyer/intake" className="eec-btn-secondary !text-white !border-white/25 hover:!bg-white/10">Book a free discovery call →</Link>
          </div>
          <div className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">70+ suppliers · Singapore Headquartered</div>
        </div>
      </section>
    </div>
  );
}
