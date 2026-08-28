"use client";

import { useEffect, useState } from "react";
import { getAirQuality } from "@/lib/api";
import type { AirQualityData, GeoLocation } from "@/lib/types";

const cache = new Map<string, AirQualityData>();

export function useAirQuality(loc: GeoLocation | null) {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(!!loc);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loc) { setData(null); setLoading(false); setError(false); return; }
    const ck = `aq:${loc.latitude},${loc.longitude}`;
    let active = true;

    (async () => {
      if (cache.has(ck)) { setData(cache.get(ck)!); setLoading(false); setError(false); return; }
      setLoading(true); setError(false);
      try {
        const d = await getAirQuality(loc.latitude, loc.longitude);
        cache.set(ck, d);
        if (active) { setData(d); setLoading(false); }
      } catch { if (active) { setError(true); setLoading(false); } }
    })();

    return () => { active = false; };
  }, [loc]);

  return { data, loading, error };
}
