"use client";

import { getIconSpec } from "@/lib/weatherCodes";
import { displayTemp, formatHour } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";
import WeatherIcon from "@/components/WeatherIcon";

interface HourlyPoint { time: string; temperature_2m: number; weather_code: number; precipitation_probability: number; is_day: number; }

export default function HourlyStrip({ hourly }: { hourly: HourlyPoint[] }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const nowKey = new Date().toISOString().slice(0, 13) + ":00";
  const startIdx = Math.max(0, hourly.findIndex(h => h.time.slice(0, 13) === nowKey.slice(0, 13)));
  const slice = hourly.slice(startIdx, startIdx + 24);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">{translate(lang, "hourlyForecast")}</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
        {slice.map((h, i) => {
          const spec = getIconSpec(h.weather_code);
          return (
            <div key={h.time + i} className="flex min-w-[68px] flex-col items-center gap-1 rounded-2xl bg-white/5 p-2">
              <span className="text-xs text-white/60">{i === 0 ? translate(lang, "now") : formatHour(h.time)}</span>
              <WeatherIcon name={spec.icon} className={`h-7 w-7 ${h.is_day ? "" : "text-white/50"}`} />
              <span className="text-sm font-semibold">{displayTemp(h.temperature_2m, settings)}</span>
              <span className="text-[11px] text-white/70">{h.precipitation_probability != null ? `${h.precipitation_probability}%` : ""}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
