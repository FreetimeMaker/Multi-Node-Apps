import type { LangCode } from "@/lib/types";

interface IconSpec {
  /** 24x24 stroke icon path representing the condition */
  icon: "sun" | "partly" | "cloud" | "fog" | "drizzle" | "rain" | "freezing" | "snow" | "snowgrains" | "showers" | "thunder" | "haillight";
}

const codeMap: Record<number, IconSpec> = {
  0: { icon: "sun" },
  1: { icon: "sun" },
  2: { icon: "partly" },
  3: { icon: "cloud" },
  45: { icon: "fog" },
  48: { icon: "fog" },
  51: { icon: "drizzle" },
  53: { icon: "drizzle" },
  55: { icon: "drizzle" },
  56: { icon: "freezing" },
  57: { icon: "freezing" },
  61: { icon: "rain" },
  63: { icon: "rain" },
  65: { icon: "rain" },
  66: { icon: "freezing" },
  67: { icon: "freezing" },
  71: { icon: "snow" },
  73: { icon: "snow" },
  75: { icon: "snow" },
  77: { icon: "snowgrains" },
  80: { icon: "showers" },
  81: { icon: "showers" },
  82: { icon: "showers" },
  85: { icon: "snow" },
  86: { icon: "snow" },
  95: { icon: "thunder" },
  96: { icon: "haillight" },
  99: { icon: "thunder" },
};

export function getIconSpec(code: number): IconSpec {
  return codeMap[code] ?? { icon: "cloud" };
}

export type IconName = IconSpec["icon"];

const descriptions: Record<LangCode, Record<number, string>> = {
  en: codeDescription("en"),
  de: codeDescription("de"),
  ru: codeDescription("ru"),
};

function codeDescription(lang: LangCode): Record<number, string> {
  const base: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  if (lang === "en") return base;

  const de: Record<number, string> = {
    0: "Klarer Himmel",
    1: "Überwiegend klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Nebel",
    48: "Nebel mit Reif",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    56: "Leichter gefrierender Nieselregen",
    57: "Starker gefrierender Nieselregen",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    66: "Leichter gefrierender Regen",
    67: "Starker gefrierender Regen",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    77: "Schneegriesel",
    80: "Leichte Regenschauer",
    81: "Mäßige Regenschauer",
    82: "Kräftige Regenschauer",
    85: "Leichte Schneeschauer",
    86: "Starke Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit schwerem Hagel",
  };
  const ru: Record<number, string> = {
    0: "Ясно",
    1: "Преимущественно ясно",
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Туман с изморозью",
    51: "Слабый морось",
    53: "Умеренный морось",
    55: "Сильный морось",
    56: "Слабый ледяной морось",
    57: "Сильный ледяной морось",
    61: "Небольшой дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    66: "Небольшой ледяной дождь",
    67: "Сильный ледяной дождь",
    71: "Небольшой снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    77: "Снежные зёрна",
    80: "Небольшие ливни",
    81: "Умеренные ливни",
    82: "Сильные ливни",
    85: "Небольшие снежные заряды",
    86: "Сильные снежные заряды",
    95: "Гроза",
    96: "Гроза с небольшим градом",
    99: "Гроза с сильным градом",
  };
  return lang === "de" ? de : ru;
}

export function getDescription(code: number, lang: LangCode): string {
  return descriptions[lang]?.[code] ?? "Unknown";
}
