"use client";

import { useSettings } from "@/components/SettingsContext";
import { translate } from "@/lib/i18n";
import type { LangCode, PressureUnit, TemperatureUnit, WindSpeedUnit } from "@/lib/types";
import { PRESSURE_SYMBOLS, TEMP_SYMBOLS, WIND_SYMBOLS } from "@/lib/units";

export default function SettingsPanel() {
  const { settings, update } = useSettings();
  const lang = settings.lang;
  const t = (k: Parameters<typeof translate>[1]) => translate(lang, k);

  return (
    <section className="rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
      <h3 className="mb-4 text-sm uppercase tracking-widest text-white/60">{t("settings")}</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-white/80">{t("temperatureUnit")}</p>
          <Seg options={[{ v: "celsius", l: "°C" }, { v: "fahrenheit", l: "°F" }]} val={settings.tempUnit} onChange={v => update({ tempUnit: v as TemperatureUnit })} />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("windUnit")}</p>
          <Seg options={Object.entries(WIND_SYMBOLS).map(([v, l]) => ({ v, l }))} val={settings.windUnit} onChange={v => update({ windUnit: v as WindSpeedUnit })} />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("pressureUnit")}</p>
          <Seg options={[{ v: "hpa", l: "hPa" }, { v: "mmhg", l: "mmHg" }]} val={settings.pressureUnit} onChange={v => update({ pressureUnit: v as PressureUnit })} />
        </div>
        <div>
          <p className="mb-2 text-sm text-white/80">{t("language")}</p>
          <Seg options={[{ v: "en", l: "EN" }, { v: "de", l: "DE" }, { v: "ru", l: "RU" }]} val={settings.lang} onChange={v => update({ lang: v as LangCode })} />
        </div>
      </div>
    </section>
  );
}

function Seg({ options, val, onChange }: { options: { v: string; l: string }[]; val: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-2xl bg-white/10 p-1">
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)} className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${val === o.v ? "bg-white text-sky-700 shadow" : "text-white/80 hover:bg-white/10"}`}>{o.l}</button>
      ))}
    </div>
  );
}
