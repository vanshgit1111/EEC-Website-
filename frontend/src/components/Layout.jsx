import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, Globe, Handshake, ShieldCheck, MapPin, ArrowRight, Linkedin, Twitter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/for-buyers", label: "For Buyers" },
  { to: "/for-suppliers", label: "For Suppliers" },
  { to: "/categories", label: "Categories" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

function Logo({ size = "header" }) {
  // Mobile-first; scales noticeably up on tablet/laptop/desktop.
  const heightClass = size === "footer"
    ? "h-20 md:h-28 lg:h-36"
    : "h-14 md:h-20 lg:h-24";
  return (
    <Link to="/" className="inline-flex items-center group" data-testid={size === "footer" ? "footer-brand-link" : "brand-link"}>
      <img
        src="/eec-logo.png"
        alt="Elan Exports Consultancy -- Singapore Headquartered sourcing consultancy"
        className={`${heightClass} w-auto select-none transition-transform duration-300 group-hover:scale-[1.03]`}
        data-testid={size === "footer" ? "footer-logo" : "brand-logo"}
        draggable="false"
      />
      <span className="sr-only">Elan Exports Consultancy</span>
    </Link>
  );
}

/* ── Orbit graphic inside the affiliate banner ── */
function AffiliateOrbit() {
  const cx = 150, cy = 130;
  const avatars = [
    { x: 246, y:  50, bg: "#DCFCE7", ring: "#4ADE80",  label: "Affiliate partner 1" },
    { x: 202, y: 204, bg: "#FEE2E2", ring: "#F87171",  label: "Affiliate partner 2" },
    { x: 205, y: 128, bg: "#DBEAFE", ring: "#60A5FA",  label: "Affiliate partner 3" },
    { x:  60, y: 122, bg: "#EDE9FE", ring: "#A78BFA",  label: "Affiliate partner 4" },
    { x:  48, y:  58, bg: "#FEF3C7", ring: "#FBBF24",  label: "Affiliate partner 5" },
    { x:  37, y: 183, bg: "#CCFBF1", ring: "#34D399",  label: "Affiliate partner 6" },
  ];
  return (
    <svg viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <style>{`@keyframes eec-orbit-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      {/* Slowly rotating dashed rings */}
      <g style={{ animation: "eec-orbit-spin 80s linear infinite", transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r="55"  stroke="#E5EBF2" strokeWidth="1"   strokeDasharray="4 7"/>
        <circle cx={cx} cy={cy} r="90"  stroke="#E5EBF2" strokeWidth="1"   strokeDasharray="4 7"/>
        <circle cx={cx} cy={cy} r="125" stroke="#E5EBF2" strokeWidth="1.5" strokeDasharray="4 7"/>
      </g>
      {/* Center hexagon */}
      <polygon
        points="168,130 159,114.4 141,114.4 132,130 141,145.6 159,145.6"
        stroke="#C9A23F" strokeWidth="1.8" fill="#FFFBEB"
      />
      <circle cx={cx} cy={cy} r="4.5" fill="#C9A23F" fillOpacity="0.7"/>
      {/* Avatar circles */}
      {avatars.map((a, i) => (
        <g key={i} role="img" aria-label={a.label}>
          {/* Outer glow ring */}
          <circle cx={a.x} cy={a.y} r="25" fill={a.ring} fillOpacity="0.15"/>
          {/* Avatar background */}
          <circle cx={a.x} cy={a.y} r="20" fill={a.bg} stroke={a.ring} strokeWidth="2"/>
          {/* Head */}
          <circle cx={a.x} cy={a.y - 6} r="6.5" fill={a.ring} fillOpacity="0.85"/>
          {/* Shoulders */}
          <ellipse cx={a.x} cy={a.y + 14} rx="10" ry="6" fill={a.ring} fillOpacity="0.55"/>
        </g>
      ))}
    </svg>
  );
}

/* ── Affiliate banner (sits at top of footer card) ── */
function AffiliateBanner() {
  return (
    <div className="bg-white rounded-3xl px-8 md:px-10 py-8 md:py-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
      {/* Text side */}
      <div className="flex flex-col gap-4 max-w-sm">
        <span className="text-sm text-[#6B7280] tracking-wide">Become an Affiliate</span>
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#012D76] leading-tight">
          Join our Affiliate Program
        </h2>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          Earn competitive commissions for every buyer you refer who completes a sourcing engagement — reach out to&nbsp;
          <a href="mailto:partners@eectrade.com" className="text-[#012D76] underline-offset-2 hover:underline">partners@eectrade.com</a>
          &nbsp;for program details.
        </p>
        <Link
          to="/affiliate"
          className="inline-flex items-center gap-2 bg-[#012D76] hover:bg-[#011F54] text-white text-sm font-medium px-6 py-3 rounded-full w-fit transition-colors"
          aria-label="Join the Élan Exports affiliate program"
        >
          Become an affiliate <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      {/* Orbit graphic */}
      <div className="flex-shrink-0 w-56 h-52 md:w-64 md:h-60 hidden sm:block" aria-hidden="true">
        <AffiliateOrbit />
      </div>
    </div>
  );
}

function FooterColHeader({ title }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-[#C9A23F] flex-shrink-0" aria-hidden="true" />
        <span className="text-xs font-bold tracking-widest text-[#012D76]">{title}</span>
      </div>
      <div className="h-px w-6 bg-[#C9A23F]" aria-hidden="true" />
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li className="list-none">
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm text-[#3A4759] hover:text-[#012D76] hover:underline transition-colors"
      >
        {children}
        <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
      </Link>
    </li>
  );
}

function FooterBadge({ icon, label1, label2 }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="w-10 h-10 rounded-full bg-[#EFF4F9] flex items-center justify-center text-[#012D76]">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-[#012D76] leading-tight">
        {label1}<br />{label2}
      </span>
    </div>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-eec">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FFFFFF]/90 border-b hairline">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 md:h-28 lg:h-32 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                data-testid={`nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `text-sm tracking-wide pb-1 border-b-2 transition-colors ${
                    isActive
                      ? "text-[#012D76] font-semibold border-[#C9A23F]"
                      : "text-[#3A4759] border-transparent hover:text-[#012D76]"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user && user.user_id ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : user.role === "supplier" ? "/supplier" : "/buyer"}
                  className="text-sm text-[#3A4759] hover:text-[#012D76] tracking-wide"
                  data-testid="nav-portal"
                >
                  {user.role === "admin" ? "Admin console" : user.role === "supplier" ? "Supplier portal" : "Buyer portal"}
                </Link>
                <button
                  onClick={async () => { await logout(); navigate("/"); }}
                  className="text-sm text-[#6B7280] hover:text-[#012D76] tracking-wide"
                  data-testid="nav-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-[#3A4759] hover:text-[#012D76] tracking-wide" data-testid="nav-login">
                  Sign in
                </Link>
                <Link to="/register" className="eec-btn-primary text-xs h-10 px-5" data-testid="nav-apply">
                  Apply <ArrowUpRight size={14} />
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-[#012D76]" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t hairline bg-[#FFFFFF]">
            <div className="px-5 py-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm py-2 pl-3 border-l-2 ${
                      isActive ? "text-[#012D76] font-semibold border-[#C9A23F]" : "text-[#012D76] border-transparent"
                    }`
                  }
                  data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {n.label}
                </NavLink>
              ))}
              {user && user.user_id ? (
                <>
                  <Link to={user.role === "admin" ? "/admin" : user.role === "supplier" ? "/supplier" : "/buyer"} className="text-[#012D76] py-2" onClick={() => setOpen(false)}>
                    {user.role === "admin" ? "Admin Console" : "My Portal"}
                  </Link>
                  <button onClick={async () => { await logout(); setOpen(false); navigate("/"); }} className="text-left text-[#3A4759] py-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-[#012D76] py-2" onClick={() => setOpen(false)}>Sign in</Link>
                  <Link to="/register" className="eec-btn-primary" onClick={() => setOpen(false)}>Apply</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 bg-white px-4 md:px-8 pb-10" aria-label="Site footer">
        <div className="max-w-7xl mx-auto bg-[#F5F5F7] rounded-3xl shadow-sm px-8 md:px-12 lg:px-14 pt-8 pb-8">

          {/* ── Affiliate banner ── */}
          <AffiliateBanner />

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.8fr] gap-10 lg:gap-8">

            {/* ── Left: brand col ── */}
            <div className="flex flex-col gap-5">
              <Link to="/" aria-label="Élan Exports Consultancy home" data-testid="footer-brand-link">
                <img
                  src="/eec-logo-wbg.png"
                  alt="Élan Exports Consultancy — Singapore Headquartered Sourcing Consultancy"
                  className="h-28 w-auto select-none"
                  data-testid="footer-logo"
                  draggable="false"
                />
              </Link>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-[230px]">
                Singapore-headquartered sourcing consultancy. Embedded procurement support for global buyers sourcing from India and Asia.
              </p>
              <div className="flex items-start gap-5 flex-wrap">
                <FooterBadge icon={<Globe size={17} />} label1="Global" label2="Network" />
                <FooterBadge icon={<Handshake size={17} />} label1="Trusted" label2="Partnerships" />
                <FooterBadge icon={<ShieldCheck size={17} />} label1="Reliable" label2="Sourcing" />
              </div>
            </div>

            {/* ── BUYERS ── */}
            <div className="lg:border-l lg:border-[#E5EBF2] lg:pl-8">
              <FooterColHeader title="BUYERS" />
              <ul className="space-y-3">
                <FooterLink to="/for-buyers">For Buyers</FooterLink>
                <FooterLink to="/buyer/intake">Submit a Sourcing Brief</FooterLink>
                <FooterLink to="/services">Services</FooterLink>
                <FooterLink to="/categories">Categories</FooterLink>
              </ul>
            </div>

            {/* ── SUPPLIERS ── */}
            <div className="lg:border-l lg:border-[#E5EBF2] lg:pl-8">
              <FooterColHeader title="SUPPLIERS" />
              <ul className="space-y-3">
                <FooterLink to="/for-suppliers">For Suppliers</FooterLink>
                <FooterLink to="/register?role=supplier">Apply to Network</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
              </ul>
            </div>

            {/* ── COMPANY ── */}
            <div className="lg:border-l lg:border-[#E5EBF2] lg:pl-8">
              <FooterColHeader title="COMPANY" />
              <ul className="space-y-3">
                <FooterLink to="/login">Sign In</FooterLink>
                <FooterLink to="/register">Register</FooterLink>
                <li className="list-none">
                  <a href="mailto:partners@eectrade.com" className="inline-flex items-center gap-1 text-sm text-[#3A4759] hover:text-[#012D76] hover:underline transition-colors">
                    partners@eectrade.com <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                  </a>
                </li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </ul>
            </div>

            {/* ── STAY UPDATED ── */}
            <div className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-[#E5EBF2] lg:pl-8">
              <FooterColHeader title="STAY UPDATED" />
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                Receive product updates, news, exclusive discounts and early access.
              </p>

              {/* Email input */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative mb-4"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full rounded-full bg-white border border-[#E5EBF2] px-5 py-3 pr-[52px] text-sm text-[#012D76] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#012D76]/20 focus:border-[#012D76] transition"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#012D76] hover:bg-[#011F54] flex items-center justify-center transition-colors"
                >
                  <ArrowRight size={15} className="text-white" aria-hidden="true" />
                </button>
              </form>

              {/* Location card */}
              <div className="rounded-2xl bg-white px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#6B7280] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#012D76] leading-snug">Singapore HQ</p>
                    <p className="text-xs text-[#6B7280] leading-snug mt-0.5">India &amp; Asia Operations<br/>Sourcing Network</p>
                  </div>
                </div>
                {/* Dotted world-map graphic */}
                <svg width="72" height="48" viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0 opacity-80">
                  {/* dot grid representing world continents */}
                  {[
                    [4,8],[8,8],[12,8],[16,8],[20,8],[28,8],[32,8],[36,8],
                    [2,12],[6,12],[10,12],[14,12],[18,12],[22,12],[26,12],[30,12],[34,12],[38,12],[42,12],[46,12],
                    [2,16],[6,16],[10,16],[14,16],[18,16],[22,16],[26,16],[30,16],[34,16],[38,16],[42,16],[46,16],[50,16],[54,16],[58,16],[62,16],[66,16],
                    [2,20],[6,20],[10,20],[14,20],[18,20],[22,20],[26,20],[30,20],[34,20],[38,20],[42,20],[46,20],[50,20],[54,20],[58,20],[62,20],[66,20],
                    [6,24],[10,24],[14,24],[18,24],[22,24],[26,24],[30,24],[34,24],[38,24],[42,24],[46,24],[50,24],[54,24],[58,24],[62,24],
                    [10,28],[14,28],[18,28],[22,28],[26,28],[30,28],[34,28],[38,28],[42,28],[46,28],[50,28],[54,28],
                    [14,32],[18,32],[22,32],[26,32],[30,32],[34,32],[38,32],[42,32],[46,32],
                    [18,36],[22,36],[26,36],[30,36],[34,36],[38,36],[42,36],
                    [26,40],[30,40],[34,40],[38,40],
                    [30,44],[34,44],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="1.4" fill="#D1D5DB" />
                  ))}
                  {/* Singapore highlight dot */}
                  <circle cx="58" cy="28" r="3" fill="#2563EB" />
                  <circle cx="58" cy="28" r="5" fill="#2563EB" fillOpacity="0.2" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-[#E5EBF2] mt-10 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-[#6B7280]">
              © 2026 Élan Exports Consultancy Pte. Ltd. All rights reserved.
            </span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs text-[#6B7280]">Follow Us</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#012D76] hover:bg-[#011F54] flex items-center justify-center transition-colors">
                <Linkedin size={15} className="text-white" aria-hidden="true" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="w-9 h-9 rounded-full bg-[#012D76] hover:bg-[#011F54] flex items-center justify-center transition-colors">
                <Twitter size={15} className="text-white" aria-hidden="true" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="w-9 h-9 rounded-full bg-[#012D76] hover:bg-[#011F54] flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="white" strokeWidth="1.8" fill="none"/>
                  <path d="M4.5 9.5c2 .5 4.5.5 7-.5 2.5-1 4.5-2.5 5.5-4M8 20.5c.5-3 2-5.5 4-7.5s4.5-3 7-3.5M4 13.5c1.5.5 3.5.5 5.5 0 2-.5 4-1.5 5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <span className="text-xs text-[#9CA3AF] tracking-wider ml-1 hidden sm:inline">SINGAPORE HQ · INDIA &amp; ASIA OPERATIONS</span>
            </div>
          </div>

        </div>
      </footer>
      <a href="https://wa.me/6586784216" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200" aria-label="Chat on WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.7-6.415-1.9l-.448-.29-2.65.888.888-2.65-.29-.448A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></a>
    </div>
  );
}
