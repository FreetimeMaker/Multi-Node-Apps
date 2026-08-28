"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { GeoLocation } from "@/lib/types";

const STORAGE_KEY = "geoweather:cities";
const STARTER: GeoLocation[] = [
  { id: 1, name: "Bern", latitude: 46.948, longitude: 7.4474, country: "Switzerland", country_code: "CH", admin1: "Bern" },
];

interface Ctx { cities: GeoLocation[]; addCity: (l: GeoLocation) => void; removeCity: (id: number) => void; }
const CitiesContext = createContext<Ctx>({ cities: STARTER, addCity: () => {}, removeCity: () => {} });

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<GeoLocation[]>(STARTER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { const r = localStorage.getItem(STORAGE_KEY); if (r) { const p = JSON.parse(r); if (Array.isArray(p)) setCities(p); } } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cities)); } catch {}
  }, [cities, hydrated]);

  const addCity = (l: GeoLocation) => setCities(p => p.some(c => c.id === l.id) ? p : [...p, l]);
  const removeCity = (id: number) => setCities(p => p.filter(c => c.id !== id));

  return <CitiesContext.Provider value={{ cities, addCity, removeCity }}>{children}</CitiesContext.Provider>;
}

export function useCities(): Ctx {
  return useContext(CitiesContext);
}
