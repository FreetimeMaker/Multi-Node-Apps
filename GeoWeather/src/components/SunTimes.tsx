"use client";

import { formatTime } from "@/lib/units";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";

export default function SunTimes({ sunrise, sunset }: { sunrise: string; sunset: string }) {
  const { settings } = useSettings();
  const lang = settings.lang;
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="3.5" fill="currentColor" stroke="none" />
          <path d="M12 2.5V4M4.9 4.9l1.1 1.1M19.1 4.9L18 6M2.5 10H4M20 10h1.5M5 18h3M9.5 14h5M16 18h3M12 14v4" />
        </svg>
        <div>
          <p className="text-xs text-white/60">{translate(lang, "sunrise")}</p>
          <p className="font-semibold">{formatTime(sunrise, lang)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-amber-300" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="3.5" fill="currentColor" stroke="none" />
          <path d="M12 2.5V4M4.9 4.9l1.1 1.1M19.1 4.9L18 6M2.5 10H4M20 10h1.5M5 18h3M9.5 14h5M16 18h3M12 14v4" />
        </svg>
        <div>
          <p className="text-xs text-white/60">{translate(lang, "sunset")}</p>
          <p className="font-semibold">{formatTime(sunset, lang)}</p>
        </div>
      </div>
    </section>
  );
}
