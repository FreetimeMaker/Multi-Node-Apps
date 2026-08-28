"use client";

import { useEffect, useState } from "react";
import { getArchive } from "@/lib/api";
import type { ArchiveData, GeoLocation, Settings } from "@/lib/types";

const cache = new Map<string, ArchiveData>();

export function useArchive(loc: GeoLocation | null, start: string, end: string, settings: Settings) {
  const [data, setData] = useState<ArchiveData | null>(null);
  const [loading, setLoading] = useState(!!loc);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loc || !start || !end) { setData(null); setLoading(false); setError(false); return; }
    const ck = `arch:${loc.latitude},${loc.longitude}:${start}:${end}:${settings.tempUnit}`;
    let active = true;

    (async () => {
      if (cache.has(ck)) { setData(cache.get(ck)!); setLoading(false); setError(false); return; }
      setLoading(true); setError(false);
      try {
        const d = await getArchive(loc.latitude, loc.longitude, start, end, settings);
        cache.set(ck, d);
        if (active) { setData(d); setLoading(false); }
      } catch { if (active) { setError(true); setLoading(false); } }
    })();

    return () => { active = false; };
  }, [loc, start, end, settings.tempUnit]);

  return { data, loading, error };
}
