"use client";

import { useMemo, useState } from "react";
import type { GeoLocation } from "@/lib/types";
import { useArchive } from "@/hooks/useArchive";
import { useSettings } from "@/components/SettingsContext";
import { getIconSpec } from "@/lib/weatherCodes";
import { daysAgoISO, displayTemp, formatPrecipitation, formatDay } from "@/lib/units";
import { translate } from "@/lib/i18n";
import WeatherIcon from "@/components/WeatherIcon";

type Range = "30" | "90" | "365";
const RANGE_MAP: Record<Range, { days: number; i18n: "last30Days" | "last90Days" | "lastYear" }> = {
  "30": { days: 30, i18n: "last30Days" }, "90": { days: 90, i18n: "last90Days" }, "365": { days: 365, i18n: "lastYear" },
};

export default function WeatherHistory({ loc }: { loc: GeoLocation }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const [range, setRange] = useState<Range>("30");
  const { days } = RANGE_MAP[range];
  const { data, loading, error } = useArchive(loc, daysAgoISO(days), daysAgoISO(0), settings);

  const daily = useMemo(() => {
    if (!data?.daily) return [];
    return data.daily.time.map((time, i) => ({
      time, weather_code: data.daily!.weather_code[i], temperature_2m_max: data.daily!.temperature_2m_max[i],
      temperature_2m_min: data.daily!.temperature_2m_min[i], precipitation_sum: data.daily!.precipitation_sum[i],
    }));
  }, [data]);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm uppercase tracking-widest text-white/60">{translate(lang, "history")}</h3>
        <div className="flex gap-1 rounded-2xl bg-white/10 p-1">
          {(Object.keys(RANGE_MAP) as Range[]).map(r => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${range === r ? "bg-white text-sky-700 shadow" : "text-white/80 hover:bg-white/10"}`}>{translate(lang, RANGE_MAP[r].i18n)}</button>
          ))}
        </div>
      </div>
      {loading && <div className="flex justify-center py-10"><div className="h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" /></div>}
      {error && !loading && <p className="py-10 text-center text-white/70">{translate(lang, "error")}</p>}
      {!loading && !error && daily.length === 0 && <p className="py-10 text-center text-white/70">No data available.</p>}
      {!loading && !error && daily.length > 0 && (
        <div className="max-h-[420px] overflow-y-auto pr-1">
          <ul className="divide-y divide-white/10">
            {daily.map(d => {
              const spec = getIconSpec(d.weather_code);
              return (
                <li key={d.time} className="flex items-center gap-3 py-2 text-sm">
                  <span className="w-24 shrink-0 text-white/80">{formatDay(d.time, lang)}</span>
                  <WeatherIcon name={spec.icon} className="h-5 w-5 shrink-0" />
                  <span className="hidden w-24 text-white/60 sm:block">{formatPrecipitation(d.precipitation_sum ?? 0)}</span>
                  <div className="ml-auto flex w-28 items-center justify-end gap-2 tabular-nums">
                    <span className="text-white/60">{displayTemp(d.temperature_2m_min, settings)}</span>
                    <span className="h-1.5 w-8 overflow-hidden rounded-full bg-white/20"><span className="block h-full rounded-full bg-white/70" style={{ width: `${Math.min(100, 20 + Math.max(1, Math.round(d.temperature_2m_max) - Math.round(d.temperature_2m_min)) * 4)}%` }} /></span>
                    <span className="font-semibold">{displayTemp(d.temperature_2m_max, settings)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
