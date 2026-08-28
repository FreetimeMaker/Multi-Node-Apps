"use client";

import Link from "next/link";
import type { GeoLocation } from "@/lib/types";
import { useForecast } from "@/hooks/useForecast";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useSettings } from "@/components/SettingsContext";
import { useCities } from "@/components/CitiesContext";
import { getIconSpec } from "@/lib/weatherCodes";
import { getAqiLevel, displayTemp } from "@/lib/units";
import { translate } from "@/lib/i18n";
import WeatherIcon from "@/components/WeatherIcon";

export default function CityCard({ loc }: { loc: GeoLocation }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const { removeCity } = useCities();
  const { data, loading, error } = useForecast(loc, settings);
  const { data: aqData } = useAirQuality(loc);
  const spec = data?.current ? getIconSpec(data.current.weather_code).icon : "cloud";
  const aqi = aqData?.hourly?.us_aqi?.[0];
  const aqiLevel = aqi != null ? getAqiLevel(aqi) : null;

  return (
    <Link href={`/city/${loc.id}`} className="group relative block rounded-3xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/20 shadow-xl transition hover:bg-white/15">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{loc.name}</h3>
          {loc.country && <p className="text-sm text-white/60">{loc.country}{loc.admin1 && loc.admin1 !== loc.country ? `, ${loc.admin1}` : ""}</p>}
        </div>
        <WeatherIcon name={spec} className="h-9 w-9 text-white/90 animate-float" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        {loading && <p className="text-white/70">{translate(lang, "loading")}</p>}
        {error && <p className="text-red-200">{translate(lang, "error")}</p>}
        {!loading && !error && data?.current && (
          <>
            <p className="text-4xl font-light">{displayTemp(data.current.temperature_2m, settings)}</p>
            <p className="text-sm text-white/70">{data.daily?.temperature_2m_max ? `${displayTemp(data.daily.temperature_2m_max[0], settings)} / ${displayTemp(data.daily.temperature_2m_min[0], settings)}` : ""}</p>
          </>
        )}
      </div>
      {aqiLevel && <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${aqiLevel.bg} ${aqiLevel.color}`}>AQI {aqi}</div>}
      <button onClick={e => { e.preventDefault(); e.stopPropagation(); removeCity(loc.id); }} className="absolute right-3 top-3 rounded-full bg-white/10 p-1.5 text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/70 hover:text-white" title={translate(lang, "removeCity")}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
      </button>
    </Link>
  );
}
