"use client";

import { getIconSpec } from "@/lib/weatherCodes";
import { displayTemp, formatDay, formatPrecipitation } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";
import WeatherIcon from "@/components/WeatherIcon";

interface DailyPoint { time: string; weather_code: number; temperature_2m_max: number; temperature_2m_min: number; precipitation_sum: number; precipitation_probability_max: number; }

export default function DailyList({ daily }: { daily: DailyPoint[] }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const today = daily[0]?.time;

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">{translate(lang, "dailyForecast")}</h3>
      <ul className="divide-y divide-white/10">
        {daily.map(d => {
          const spec = getIconSpec(d.weather_code);
          const isToday = d.time === today;
          const label = isToday ? translate(lang, "today") : d.time === daily[1]?.time ? translate(lang, "tomorrow") : formatDay(d.time, lang);
          return (
            <li key={d.time} className="flex items-center gap-3 py-2.5 text-sm">
              <span className={`w-24 shrink-0 ${isToday ? "font-semibold" : ""}`}>{label}</span>
              <WeatherIcon name={spec.icon} className="h-6 w-6 shrink-0" />
              <span className="hidden w-24 flex-1 text-white/60 sm:block">{formatPrecipitation(d.precipitation_sum ?? 0)}</span>
              <div className="ml-auto flex w-28 items-center justify-end gap-2 tabular-nums">
                <span className="text-white/60">{displayTemp(d.temperature_2m_min, settings)}</span>
                <span className="h-1.5 w-8 shrink-0 overflow-hidden rounded-full bg-white/20">
                  <span className="block h-full rounded-full bg-white/70" style={{ width: `${Math.min(100, 20 + Math.max(1, Math.round(d.temperature_2m_max) - Math.round(d.temperature_2m_min)) * 4)}%` }} />
                </span>
                <span className="font-semibold">{displayTemp(d.temperature_2m_max, settings)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
