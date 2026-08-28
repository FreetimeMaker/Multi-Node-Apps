"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { useCities } from "@/components/CitiesContext";
import { useSettings } from "@/components/SettingsContext";
import { useSubscription } from "@/components/SubscriptionContext";
import { useForecast } from "@/hooks/useForecast";
import { useAirQuality } from "@/hooks/useAirQuality";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyStrip from "@/components/HourlyStrip";
import DailyList from "@/components/DailyList";
import SunTimes from "@/components/SunTimes";
import AirQualityCard from "@/components/AirQualityCard";
import WeatherHistory from "@/components/WeatherHistory";
import { translate } from "@/lib/i18n";

export default function CityDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { cities } = useCities();
  const { settings } = useSettings();
  const lang = settings.lang;
  const t = (k: Parameters<typeof translate>[1]) => translate(lang, k);

  const loc = useMemo(() => cities.find(c => String(c.id) === params.id) ?? null, [cities, params.id]);
  const { planDetails } = useSubscription();
  const { data, loading, error, retry } = useForecast(loc, settings, planDetails.forecastDays);
  const { data: aqData } = useAirQuality(loc);

  const hourly = useMemo(() => {
    if (!data?.hourly) return [];
    const maxHours = planDetails.forecastDays * 24;
    return data.hourly.time.slice(0, maxHours).map((time, i) => ({
      time, temperature_2m: data.hourly!.temperature_2m[i], apparent_temperature: data.hourly!.apparent_temperature[i],
      precipitation_probability: data.hourly!.precipitation_probability[i], weather_code: data.hourly!.weather_code[i], is_day: data.hourly!.is_day[i],
    }));
  }, [data, planDetails.forecastDays]);

  const daily = useMemo(() => {
    if (!data?.daily) return [];
    const days = data.daily.time.slice(0, planDetails.forecastDays).map((time, i) => ({
      time, weather_code: data.daily!.weather_code[i], temperature_2m_max: data.daily!.temperature_2m_max[i],
      temperature_2m_min: data.daily!.temperature_2m_min[i], precipitation_probability_max: data.daily!.precipitation_probability_max[i],
      precipitation_sum: data.daily!.precipitation_sum[i], wind_speed_10m_max: data.daily!.wind_speed_10m_max[i],
      wind_gusts_10m_max: data.daily!.wind_gusts_10m_max[i], sunrise: data.daily!.sunrise[i], sunset: data.daily!.sunset[i],
    }));
    return days;
  }, [data, planDetails.forecastDays]);

  if (!loc) return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-center">
      <p className="text-lg">{t("noCities")}</p>
      <button onClick={() => router.push("/")} className="mt-4 rounded-full bg-white px-5 py-2 font-medium text-sky-700">{t("back")}</button>
    </main>
  );

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/")} className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20">
          ← {t("back")}
        </button>
        <div className="flex items-center gap-3">
          <Link href={`/radar/${loc.id}`} className="rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/25">🗺️ {t("radar")}</Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold">{loc.name}</h1>
            <p className="text-sm text-white/70">{[loc.country, loc.admin1].filter(Boolean).join(", ")}</p>
          </div>
        </div>
      </div>

      {loading && <div className="flex flex-col items-center gap-2 py-16 text-white/80"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" /><p>{t("loading")}</p></div>}
      {error && !loading && <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-md ring-1 ring-white/20"><p>{t("error")}</p><button onClick={retry} className="mt-4 rounded-full bg-white px-5 py-2 font-medium text-sky-700">{t("retry")}</button></div>}

      {!loading && !error && data && (
        <>
          {data.current && <CurrentWeather cw={data.current} />}
          {data.daily && <SunTimes sunrise={data.daily.sunrise[0]} sunset={data.daily.sunset[0]} />}
          {hourly.length > 0 && <HourlyStrip hourly={hourly} />}
          {daily.length > 0 && <DailyList daily={daily} />}
          {aqData && <AirQualityCard data={aqData} />}
          <WeatherHistory loc={loc} />
        </>
      )}
    </main>
  );
}
