import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Factory, FileBadge, TrendingUp, Handshake } from "lucide-react";
import Seo from "@/components/Seo";
import { useAuth } from "@/context/AuthContext";

const BG = "https://images.unsplash.com/photo-1720036236697-018370867320?auto=format&fit=crop&w=1800&q=80";
const SECONDARY = "https://images.unsplash.com/photo-1730584474338-aa8d9d186bf7?auto=format&fit=crop&w=1800&q=80";

const BENEFITS = [
  { icon: TrendingUp, title: "Quality, recurring orders", desc: "Designed for long term sourcing partnerships rather than one off transactions, EEC connects qualified suppliers with institutional buyers through structured procurement programmes and clearly defined sourcing requirements." },
  { icon: Handshake, title: "Direct buyer access", desc: "EEC pre-qualifies you. You meet procurement decision-makers — not category assistants or intermediary agents. Your factory is presented with an EEC audit report, not a cold profile." },
  { icon: FileBadge, title: "Faster payments", desc: "EEC commercial terms are buyer-LC or 30/60 wired, not 120-day creep." },
  { icon: Factory, title: "Capacity planning", desc: "1–3 quarter demand visibility from our buyer book gives you forward planning confidence." },
];

const REQS = [
  "Valid IEC (Import Export Code) and GST registration, current and in active compliance",
  "Established manufacturing operations at the production facility level with a proven export history and prior international shipments. Trading and re export businesses are not eligible.",
  "Factory audit-ready — BSCI, SEDEX, or equivalent willingness within 90 days of network activation",
  "Documented quality management system (ISO 9001 preferred; internal QMS acceptable if ISO is in progress)",
  "Demonstrated export experience to NA, EU, ME or APAC markets",
];

const FAQ = [
  ["What is the EEC Supplier Network?", "The EEC Supplier Network is a curated network of verified manufacturers and suppliers connected with institutional buyers through Elan Exports Consultancy. As a Singapore headquartered global sourcing consultancy, we help facilitate international sourcing opportunities across multiple industries, with particular expertise in India and Asia."],
  ["Who can apply to join the EEC Supplier Network?", "Manufacturers and producers across a range of industries are welcome to apply. We evaluate suppliers based on manufacturing capability, product quality, export readiness, compliance standards and alignment with buyer requirements."],
  ["How does EEC qualify suppliers?", "Every supplier undergoes a qualification process that may include reviewing manufacturing capabilities, production capacity, quality systems, certifications, export experience and operational transparency. The evaluation process helps ensure suppliers meet the expectations of international buyers."],
  ["Does joining the EEC Supplier Network guarantee orders?", "No. Joining the EEC Supplier Network does not guarantee purchase orders or contracts. Qualified suppliers may be considered for relevant sourcing opportunities when their products, capabilities and commercial offering align with buyer requirements."],
  ["Which countries and industries does EEC serve?", "EEC works with institutional buyers across the EU, US, Canada, Middle East, Africa and APAC. Our sourcing expertise spans food commodities, fresh and processed foods, home textiles, hospital textile supplies, consumer goods, sustainable products and other manufacturing sectors."],
  ["Does EEC work only with suppliers from India and Asia?", "No. EEC works with verified manufacturers and suppliers worldwide. While we have extensive sourcing expertise and a strong supplier network across India and Asia, we also support sourcing from other regions based on buyer requirements."],
  ["What makes EEC different from a B2B marketplace?", "EEC is a global sourcing consultancy, not a marketplace. We work closely with buyers and suppliers throughout the sourcing process by identifying suitable manufacturing partners, facilitating procurement, supporting supplier qualification and helping build long term business relationships."],
];

export default function ForSuppliers() {
  const { user } = useAuth();
  const isAuthed = user && user.user_id;
  const dashboardHref = isAuthed && user.role === "admin" ? "/admin" : isAuthed && user.role === "supplier" ? "/supplier" : "/buyer";

  return (
    <div data-testid="for-suppliers-page">
      <Seo
        title="Join EEC Supplier Network — Vetted Export Opportunities India"
        description="EEC connects verified manufacturers with institutional buyers through transparent procurement and sourcing across India and Asia. Procurement expertise. Quality focused. Relationship driven."
        canonical="https://eectrade.com/for-suppliers"
        robots="noindex"
        ogTitle="Join EEC Supplier Network — Vetted Export Buyers India"
        ogDescription="EEC pre qualifies manufacturers for institutional buyers across the world. Faster payment terms. Recurring orders."
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/80 to-[#FFFFFF]/20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <div className="overline mb-4">For Suppliers</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            Build a recurring export book with <span className="gold-text font-medium">institutional buyers.</span>
          </h1>
          <p className="mt-6 text-[#3A4759] max-w-2xl text-lg">
            Join EECs qualified supplier network and connect with institutional buyer programmes across food commodities, fresh and agricultural products, processed and packaged foods, healthcare and hospital supplies, home textiles, apparel and hospitality products, and eco friendly, sustainable and organic products.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {isAuthed ? (
              <Link to={dashboardHref} className="eec-btn-primary" data-testid="supplier-cta-dashboard">
                Go to dashboard <ArrowUpRight size={16} />
              </Link>
            ) : (
              <Link to="/register?role=supplier" className="eec-btn-primary" data-testid="supplier-cta-apply">
                Apply to Network <ArrowUpRight size={16} />
              </Link>
            )}
            <Link to="/about" className="eec-btn-secondary">About EEC</Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Why join</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light max-w-3xl">
            What qualified suppliers get from EEC.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border hairline p-8 bg-surface">
                <Icon size={22} className="text-[#C9A23F]" />
                <div className="font-display text-xl text-[#012D76] mt-6 mb-2">{title}</div>
                <p className="text-sm text-[#3A4759] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="overline mb-3">Qualification</div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light">
              Minimum requirements to apply.
            </h2>
            <p className="mt-4 text-[#3A4759] leading-relaxed">
              EEC carefully evaluates every supplier for manufacturing capability, export readiness, quality management, compliance and operational transparency. Our focus is on building a network of verified manufacturers that supports transparent procurement and connects global buyers with qualified suppliers.
            </p>
            {isAuthed ? (
              <Link to={dashboardHref} className="eec-btn-primary mt-8" data-testid="supplier-cta-req-dashboard">
                Go to dashboard <ArrowUpRight size={16} />
              </Link>
            ) : (
              <Link to="/register?role=supplier" className="eec-btn-primary mt-8" data-testid="supplier-cta-req-apply">
                Start application <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
          <div className="lg:col-span-7">
            <div className="border hairline">
              {REQS.map((r, i) => (
                <div key={r} className={`p-6 flex items-start gap-4 ${i !== 0 ? "border-t hairline" : ""}`}>
                  <span className="font-display text-[#A6831F] text-sm">0{i + 1}</span>
                  <span className="text-[#012D76]/90">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <img src={SECONDARY} alt="Manufacturing and export sourcing" className="w-full h-[480px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFFFFF]/40 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="lg:col-span-6">
            <div className="overline mb-3">Application Flow</div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light mb-6">
              4 steps from application to active.
            </h2>
            <ol className="space-y-6">
              {[
                "Submit factory profile and documents",
                "Documentation review (3–5 business days)",
                "Virtual or on-ground factory audit",
                "Activation in supplier desk",
              ].map((s, i) => (
                <li key={s} className="flex gap-4 items-start">
                  <span className="font-display text-3xl text-[#C9A23F]/80">{(i + 1).toString().padStart(2, "0")}</span>
                  <div className="pt-2">
                    <div className="text-[#012D76]">{s}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">Certification requirements</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light mb-6">
            What EEC screens for, by category.
          </h2>
          <p className="text-[#3A4759] leading-relaxed max-w-3xl mb-8">
            Required certifications vary by product category. You do not need every certification at application stage — factory audit-readiness is what qualifies you. EEC can guide approved suppliers through the certification roadmap during onboarding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Food Commodities", "HACCP, FSSC 22000 or ISO 22000, BRC/BRCGS · FSSAI (mandatory), MRL testing reports, Phytosanitary certificate · IEC, GST"],
              ["Processed & Packaged Foods", "BRC/BRCGS, HACCP, FSSC 22000 · FSSAI, IEC, GST"],
              ["Fresh & Agricultural Products", "GlobalG.A.P., GRASP, ISO 22000 · Phytosanitary certificate, MRL testing reports · IEC, GST"],
              ["Healthcare & Hospital Supplies", "ISO 13485, ISO 9001 · product registrations where applicable · IEC, GST"],
              ["Home Textile, Apparel & Hospitality Products", "BSCI, SEDEX, Oeko-Tex 100, GOTS · IEC, GST"],
              ["Eco-Friendly, Sustainable & Organic Products", "ISO 9001, GOTS, EU Organic, NPOP, REACH · IEC, GST"],
            ].map(([cat, certs]) => (
              <div key={cat} className="border hairline bg-elevated p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#C9A23F] font-semibold mb-2">{cat}</div>
                <div className="text-sm text-[#3A4759] leading-relaxed">{certs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-3">FAQ</div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#012D76] tracking-tight font-light mb-8">
            Frequently asked questions from suppliers
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

      <section className="py-20 bg-[#012D76] text-white grain">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="overline mx-auto mb-4">Ready to apply?</div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight">Applications reviewed within 3–5 business days.</h2>
          <p className="mt-4 text-white/75">No listing fees, ever. Manufacturers with active production facilities only.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/register?role=supplier" className="eec-btn-accent">Apply to the EEC Network →</Link>
            <Link to="/about" className="eec-btn-secondary !text-white !border-white/25 hover:!bg-white/10">About EEC</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
