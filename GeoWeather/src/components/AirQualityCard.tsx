"use client";

import { useEffect, useState } from "react";
import type { AirQualityData } from "@/lib/types";
import { getAqiLevel } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";

export default function AirQualityCard({ data }: { data: AirQualityData }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const [idx, setIdx] = useState(0);
  const hourly = data.hourly;

  useEffect(() => {
    if (!hourly) return;
    const now = new Date().toISOString().slice(0, 13) + ":00";
    const i = hourly.time.findIndex(t => t.slice(0, 13) === now.slice(0, 13));
    if (i >= 0) setIdx(i);
  }, [hourly]);

  if (!hourly) return null;
  const aqi = hourly.us_aqi[idx] ?? 0;
  const level = getAqiLevel(aqi);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">{translate(lang, "airQuality")}</h3>
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${level.bg} ${level.color}`}>{aqi}</div>
        <div>
          <p className={`text-lg font-semibold ${level.color}`}>{level.label}</p>
          <p className="text-sm text-white/60">US AQI</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([["pm10", hourly.pm10], ["pm25", hourly.pm2_5], ["no2", hourly.nitrogen_dioxide], ["ozone", hourly.ozone]] as const).map(([k, arr]) => (
          <div key={k} className="rounded-2xl bg-white/10 p-3">
            <p className="text-xs text-white/60">{translate(lang, k)}</p>
            <p className="font-semibold">{(arr[idx] ?? 0).toFixed(1)}</p>
            <p className="text-[11px] text-white/50">μg/m³</p>
          </div>
        ))}
      </div>
    </section>
  );
}
