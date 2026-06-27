import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
        alt="Élan Exports Consultancy — Beyond Borders, Beyond Limits"
        className={`${heightClass} w-auto select-none transition-transform duration-300 group-hover:scale-[1.03]`}
        data-testid={size === "footer" ? "footer-logo" : "brand-logo"}
        draggable="false"
      />
      <span className="sr-only">Élan Exports Consultancy</span>
    </Link>
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

      <footer className="border-t hairline mt-20 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img
              src="/eec-logo.png"
              alt="Élan Exports Consultancy"
              className="h-24 md:h-32 lg:h-40 w-auto mb-5 select-none"
              data-testid="footer-logo"
              draggable="false"
            />
            <p className="text-sm text-[#3A4759] leading-relaxed max-w-xs">
              Singapore headquartered sourcing consultancy acting as the embedded procurement arm for global buyers sourcing from India and Asia.
            </p>
          </div>
          <div>
            <div className="overline mb-4">Buyers</div>
            <ul className="space-y-2.5 text-sm text-[#3A4759]">
              <li><Link to="/for-buyers" className="hover:text-[#012D76] transition-colors">For Buyers</Link></li>
              <li><Link to="/buyer/intake" className="hover:text-[#012D76] transition-colors">Submit a sourcing brief</Link></li>
              <li><Link to="/services" className="hover:text-[#012D76] transition-colors">Services</Link></li>
              <li><Link to="/categories" className="hover:text-[#012D76] transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <div className="overline mb-4">Suppliers</div>
            <ul className="space-y-2.5 text-sm text-[#3A4759]">
              <li><Link to="/for-suppliers" className="hover:text-[#012D76] transition-colors">For Suppliers</Link></li>
              <li><Link to="/register?role=supplier" className="hover:text-[#012D76] transition-colors">Apply to network</Link></li>
              <li><Link to="/about" className="hover:text-[#012D76] transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <div className="overline mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-[#3A4759]">
              <li><Link to="/login" className="hover:text-[#012D76] transition-colors">Sign in</Link></li>
              <li><Link to="/register" className="hover:text-[#012D76] transition-colors">Register</Link></li>
              <li><a href="mailto:partners@eectrade.com" className="hover:text-[#012D76] transition-colors">partners@eectrade.com</a></li>
              <li className="text-[#6B7280]">Singapore · India · Asia</li>
            </ul>
          </div>
        </div>
        <div className="border-t hairline">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col md:flex-row justify-between text-xs text-[#6B7280] gap-2">
            <span>© {new Date().getFullYear()} Élan Exports Consultancy. All rights reserved.</span>
            <span>SINGAPORE HQ · INDIA & ASIA OPERATIONS</span>
          </div>
        </div>
      </footer>
      <a href="https://wa.me/6586784216" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200" aria-label="Chat on WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.7-6.415-1.9l-.448-.29-2.65.888.888-2.65-.29-.448A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></a>
    </div>
  );
}
