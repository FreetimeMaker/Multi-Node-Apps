"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useSubscription } from "@/components/SubscriptionContext";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { plan, planDetails, subscription, loading, redeem, refresh } = useSubscription();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const handleRedeem = async () => {
    if (!code.trim()) return;
    setBusy(true);
    setMsg("");
    const res = await redeem(code.trim());
    setMsg(res.message ?? (res.success ? "Erfolg!" : "Fehler"));
    setCode("");
    setBusy(false);
  };

  const PLAN_ICONS: Record<string, string> = {
    free: "☁️", freemium: "⭐", premium: "👑", ultrimium: "💎",
  };

  const planOrder = ["free", "freemium", "premium", "ultrimium"];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/")} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20">← Zurück</button>
        <h1 className="text-2xl font-bold">Abo & Pläne</h1>
      </div>

      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Aktueller Plan</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-3xl">{PLAN_ICONS[plan] ?? "☁️"}</span>
          <div>
            <p className="text-2xl font-bold capitalize">{plan}</p>
            {subscription?.expires_at && <p className="text-sm text-white/60">Gültig bis: {new Date(subscription.expires_at).toLocaleDateString("de-DE")}</p>}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Max. Städte</p>
            <p className="text-lg font-bold">{planDetails.maxLocations}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Vorhersage-Tage</p>
            <p className="text-lg font-bold">{planDetails.forecastDays}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-white/60">Benachrichtigungen</p>
            <p className="text-lg font-bold">{planDetails.notifications ? "✓" : "✗"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Plan activated</p>
        <div className="mt-3 flex gap-2">
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="Plan-Code eingeben..."
            className="flex-1 rounded-xl bg-white/15 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60" />
          <button onClick={handleRedeem} disabled={busy || !code.trim()}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-sky-700 transition hover:bg-white/90 disabled:opacity-50">
            {busy ? "..." : "Aktivieren"}
          </button>
        </div>
        {msg && <p className="mt-2 text-sm text-white/80">{msg}</p>}
      </section>

      <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/60">Alle Pläne</p>
        <div className="mt-3 space-y-3">
          {planOrder.map(p => {
            const isCurrent = p === plan;
            const details: Record<string, { maxLocations: number; forecastDays: number; notifications: boolean }> = {
              free: { maxLocations: 5, forecastDays: 1, notifications: false },
              freemium: { maxLocations: 10, forecastDays: 3, notifications: true },
              premium: { maxLocations: 15, forecastDays: 7, notifications: true },
              ultrimium: { maxLocations: 20, forecastDays: 14, notifications: true },
            };
            const d = details[p];
            if (!d) return null;
            return (
              <div key={p} className={`flex items-center justify-between rounded-2xl p-4 ring-1 transition ${isCurrent ? "bg-white/15 ring-white/40" : "bg-white/5 ring-white/10"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{PLAN_ICONS[p]}</span>
                  <div>
                    <p className="font-semibold capitalize">{p}</p>
                    <p className="text-xs text-white/60">{d.maxLocations} Städte · {d.forecastDays} Tage · {d.notifications ? "Benachrichtigungen" : ""}</p>
                  </div>
                </div>
                {isCurrent && <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">Aktuell</span>}
              </div>
            );
          })}
        </div>
      </section>

      <button onClick={refresh} className="w-full rounded-xl bg-white/10 py-3 text-sm text-white/70 transition hover:bg-white/20">Aktualisieren</button>
    </main>
  );
}
