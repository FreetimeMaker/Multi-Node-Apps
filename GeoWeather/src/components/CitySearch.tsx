"use client";

import { useEffect, useRef, useState } from "react";
import type { GeoLocation } from "@/lib/types";
import { cityLabel, searchCities } from "@/lib/api";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";
import { useCities } from "@/components/CitiesContext";

export default function CitySearch({ disabled = false }: { disabled?: boolean }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const { addCity } = useCities();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      setBusy(true);
      try { const r = await searchCities(query.trim()); setResults(r); setOpen(true); } catch { setResults([]); setOpen(false); } finally { setBusy(false); }
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full max-w-lg">
      <div className="flex gap-2">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={disabled ? "Plan-Limit erreicht" : translate(lang, "searchPlaceholder")} disabled={disabled}
          className="w-full rounded-full bg-white/15 px-5 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/25 backdrop-blur-md focus:ring-2 focus:ring-white/60 disabled:opacity-50 disabled:cursor-not-allowed" />
        {busy && <div className="self-center"><div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /></div>}
      </div>
      {open && results.length > 0 && (
        <ul className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl bg-white/95 text-slate-800 shadow-2xl backdrop-blur-md">
          {results.map(r => (
            <li key={r.id}>
              <button onClick={() => { addCity(r); setOpen(false); setQuery(""); }} className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-sky-100">
                <span><span className="font-semibold">{r.name}</span><span className="block text-xs text-slate-500">{cityLabel(r)}</span></span>
                <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-medium text-white">{translate(lang, "addCity")}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && !busy && <div className="absolute z-40 mt-2 w-full rounded-2xl bg-white/95 px-4 py-3 text-slate-600 shadow-2xl">{translate(lang, "searchNoResults")}</div>}
    </div>
  );
}
