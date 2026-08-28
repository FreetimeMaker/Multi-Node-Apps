"use client";

import { useCallback, useEffect, useState } from "react";
import { getForecast } from "@/lib/api";
import type { ForecastData, GeoLocation, Settings } from "@/lib/types";

const cache = new Map<string, ForecastData>();

export function useForecast(loc: GeoLocation | null, settings: Settings, forecastDays = 16) {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(!!loc);
  const [error, setError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const retry = useCallback(() => setReloadToken(t => t + 1), []);

  useEffect(() => {
    if (!loc) { setData(null); setLoading(false); setError(false); return; }
    const ck = `${loc.latitude},${loc.longitude},${forecastDays}`;
    let active = true;

    (async () => {
      if (cache.has(ck) && reloadToken === 0) { setData(cache.get(ck)!); setLoading(false); setError(false); return; }
      setLoading(true); setError(false);
      try {
        const d = await getForecast(loc.latitude, loc.longitude, settings, forecastDays);
        cache.set(ck, d);
        if (active) { setData(d); setLoading(false); }
      } catch { if (active) { setError(true); setLoading(false); } }
    })();

    return () => { active = false; };
  }, [loc, reloadToken, settings.tempUnit, settings.windUnit, forecastDays]);

  return { data, loading, error, retry };
}
