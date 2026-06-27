import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const hash = window.location.hash || "";
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const sessionId = params.get("session_id");
    const role = sessionStorage.getItem("eec_oauth_role") || "buyer";
    sessionStorage.removeItem("eec_oauth_role");

    if (!sessionId) {
      navigate("/login", { replace: true });
      return;
    }

    (async () => {
      try {
        const { data } = await api.post("/auth/google/session", { session_id: sessionId, role });
        setUser(data);
        const dest = data.role === "supplier" ? "/supplier" : "/buyer";
        navigate(dest, { replace: true });
      } catch (e) {
        navigate("/login?error=oauth", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white/60">
      <div className="text-sm tracking-widest uppercase">Signing you in…</div>
    </div>
  );
}
