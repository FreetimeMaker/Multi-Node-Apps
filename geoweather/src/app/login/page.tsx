"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setErr("Supabase nicht konfiguriert. ENV Variables prüfen.");
      setChecking(false);
      return;
    }

    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/");
      } else {
        setChecking(false);
      }
    }).catch(() => setChecking(false));

    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleOAuth = useCallback(async (provider: "github" | "gitlab") => {
    const sb = getSupabase();
    if (!sb) {
      setErr("Supabase nicht konfiguriert.");
      return;
    }
    setBusy(true);
    setErr("");
    const { error } = await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/geoweather` },
    });
    if (error) {
      setErr(error.message);
      setBusy(false);
    }
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 32, height: 32, border: "3px solid rgba(255,255,255,0.3)",
          borderTopColor: "white", borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, margin: "0 auto 12px",
            borderRadius: 16, background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>🌤️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>GeoWeather</h1>
          <p style={{ marginTop: 4, opacity: 0.7 }}>Melde dich an, um loszulegen</p>
        </div>

        <div style={{
          borderRadius: 24, padding: 24,
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          {err && (
            <div style={{
              marginBottom: 12, padding: 10, borderRadius: 8,
              background: "rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: 13,
            }}>{err}</div>
          )}

          <button
            onClick={() => handleOAuth("github")}
            disabled={busy}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, borderRadius: 12, padding: "14px 0", marginBottom: 12,
              background: "#24292F", color: "white", fontSize: 15, fontWeight: 500,
              border: "none", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {busy ? "Weiterleitung..." : "Mit GitHub anmelden"}
          </button>

          <button
            onClick={() => handleOAuth("gitlab")}
            disabled={busy}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, borderRadius: 12, padding: "14px 0",
              background: "#FC6D26", color: "white", fontSize: 15, fontWeight: 500,
              border: "none", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="currentColor">
              <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.387 9.452.045 13.587a.924.924 0 00.331 1.023L12 23.952l11.624-9.341a.92.92 0 00.33-1.024"/>
            </svg>
            {busy ? "Weiterleitung..." : "Mit GitLab anmelden"}
          </button>
        </div>
      </div>
    </div>
  );
}
