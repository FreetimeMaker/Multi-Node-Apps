"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Settings } from "@/lib/types";

const STORAGE_KEY = "geoweather:settings";
const DEFAULTS: Settings = { tempUnit: "celsius", windUnit: "kmh", pressureUnit: "hpa", lang: "en" };

interface Ctx { settings: Settings; update: (p: Partial<Settings>) => void; }
const SettingsContext = createContext<Ctx>({ settings: DEFAULTS, update: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { const r = localStorage.getItem(STORAGE_KEY); if (r) setSettings({ ...DEFAULTS, ...JSON.parse(r) }); } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }, [settings, hydrated]);

  const update = (p: Partial<Settings>) => setSettings(s => ({ ...s, ...p }));
  return <SettingsContext.Provider value={{ settings, update }}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Ctx {
  return useContext(SettingsContext);
}
