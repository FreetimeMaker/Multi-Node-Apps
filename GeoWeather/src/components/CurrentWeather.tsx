"use client";

import type { CurrentWeather as CW } from "@/lib/types";
import { getDescription, getIconSpec } from "@/lib/weatherCodes";
import { displayTemp, formatWind, formatPressure } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";
import WeatherIcon from "@/components/WeatherIcon";

export default function CurrentWeather({ cw }: { cw: CW }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  const spec = getIconSpec(cw.weather_code);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <p className="text-sm uppercase tracking-widest text-white/60">{translate(lang, "currentConditions")}</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <p className="text-6xl font-light">{displayTemp(cw.temperature_2m, settings)}</p>
          <p className="mt-1 text-lg text-white/80">{translate(lang, "feelsLike")}: {displayTemp(cw.apparent_temperature, settings)}</p>
          <div className="mt-2 flex items-center gap-2 text-white/90">
            <WeatherIcon name={spec.icon} className="h-6 w-6" />
            <span>{getDescription(cw.weather_code, lang)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <M label={translate(lang, "humidity")} value={`${cw.relative_humidity_2m}%`} />
          <M label={translate(lang, "precipitation")} value={`${cw.precipitation ?? 0} mm`} />
          <M label={translate(lang, "wind")} value={formatWind(cw.wind_speed_10m, settings)} />
          <M label={translate(lang, "cloudCover")} value={`${cw.cloud_cover}%`} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <M label={translate(lang, "pressure")} value={formatPressure(cw.surface_pressure, settings)} />
      </div>
    </section>
  );
}

function M({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="text-xs text-white/60">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
