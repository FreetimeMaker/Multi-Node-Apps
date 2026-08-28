import type { Settings } from "@/lib/types";

export const TEMP_SYMBOLS: Record<string, string> = { celsius: "°C", fahrenheit: "°F" };
export const WIND_SYMBOLS: Record<string, string> = { kmh: "km/h", mph: "mph", ms: "m/s", kn: "kn" };
export const PRESSURE_SYMBOLS: Record<string, string> = { hpa: "hPa", mmhg: "mmHg" };

export function displayTemp(value: number, s: Settings): string {
  return `${Math.round(value)}${TEMP_SYMBOLS[s.tempUnit]}`;
}

export function formatWind(value: number, s: Settings): string {
  let v = value;
  if (s.windUnit === "mph") v = value * 1.609344;
  else if (s.windUnit === "ms") v = value * 3.6;
  else if (s.windUnit === "kn") v = value * 1.852;
  return `${v.toFixed(1)} ${WIND_SYMBOLS[s.windUnit]}`;
}

export function formatPressure(hpa: number, s: Settings): string {
  if (s.pressureUnit === "mmhg") return `${Math.round(hpa * 0.750062)} mmHg`;
  return `${Math.round(hpa)} hPa`;
}

export function formatPrecipitation(mm: number): string {
  return mm < 0.1 && mm > 0 ? "<0.1 mm" : `${mm.toFixed(1)} mm`;
}

export function formatHour(time: string): string {
  return time.slice(11, 16);
}

export function formatDay(time: string, lang: string): string {
  const d = new Date(time + "T00:00:00");
  const locale = lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US";
  return new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(d);
}

export function formatTime(time: string, lang: string): string {
  const d = new Date(time);
  const locale = lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US";
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(d);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

type AqiLevel = { color: string; bg: string; label: string };
const AQI_THRESHOLDS: { max: number; level: AqiLevel }[] = [
  { max: 50, level: { color: "text-green-400", bg: "bg-green-500/20", label: "Good" } },
  { max: 100, level: { color: "text-yellow-400", bg: "bg-yellow-500/20", label: "Moderate" } },
  { max: 150, level: { color: "text-orange-400", bg: "bg-orange-500/20", label: "Unhealthy for Sensitive" } },
  { max: 200, level: { color: "text-red-400", bg: "bg-red-500/20", label: "Unhealthy" } },
  { max: 300, level: { color: "text-purple-400", bg: "bg-purple-500/20", label: "Very Unhealthy" } },
  { max: Infinity, level: { color: "text-rose-500", bg: "bg-rose-500/20", label: "Hazardous" } },
];

export function getAqiLevel(aqi: number): AqiLevel {
  for (const t of AQI_THRESHOLDS) {
    if (aqi <= t.max) return t.level;
  }
  return AQI_THRESHOLDS[AQI_THRESHOLDS.length - 1].level;
}
