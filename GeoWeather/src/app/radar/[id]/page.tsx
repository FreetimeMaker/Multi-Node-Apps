"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useCities } from "@/components/CitiesContext";
import { translate } from "@/lib/i18n";
import { useSettings } from "@/components/SettingsContext";

const MapView = dynamic(() => import("@/components/RadarMap"), { ssr: false });

export default function RadarPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { cities } = useCities();
  const { settings } = useSettings();
  const lang = settings.lang;
  const loc = useMemo(() => cities.find(c => String(c.id) === params.id) ?? null, [cities, params.id]);

  if (!loc) return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-center">
      <p className="text-lg">{translate(lang, "noCities")}</p>
      <button onClick={() => router.push("/")} className="mt-4 rounded-full bg-white px-5 py-2 font-medium text-sky-700">{translate(lang, "back")}</button>
    </main>
  );

  return (
    <main className="mx-auto max-w-5xl space-y-4 px-4 py-8">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20">← {translate(lang, "back")}</button>
        <h1 className="text-xl font-bold">{translate(lang, "radarTitle")}</h1>
      </div>
      <div className="overflow-hidden rounded-3xl ring-1 ring-white/20 shadow-xl">
        <MapView lat={loc.latitude} lon={loc.longitude} name={loc.name} />
      </div>
      <div className="rounded-3xl bg-white/10 p-4 text-center text-sm text-white/70 backdrop-blur-md ring-1 ring-white/20">
        {loc.name} · {loc.country} · {translate(lang, "precipitation")}
      </div>
    </main>
  );
}
