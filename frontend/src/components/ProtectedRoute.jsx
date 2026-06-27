import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || user === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white/40 text-sm tracking-widest uppercase">
        Verifying credentials…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (role && user.role !== role && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
