"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RadarMap({ lat, lon, name }: { lat: number; lon: number; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { center: [lat, lon], zoom: 8, zoomControl: true, attributionControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; OpenStreetMap', maxZoom: 18 }).addTo(map);
    L.tileLayer("https://tile.open-meteo.com/v1/tile/precipitation_new/{z}/{x}/{y}.png?past_days=1&forecast_days=3", { opacity: 0.6, maxZoom: 12 }).addTo(map);
    L.tileLayer("https://tile.open-meteo.com/v1/tile/wind_speed_10m/{z}/{x}/{y}.png?past_days=0&forecast_days=3", { opacity: 0.3, maxZoom: 12 }).addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup(`<b>${name}</b>`).openPopup();
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [lat, lon, name]);

  return <div ref={ref} className="h-[500px] w-full bg-slate-900" />;
}
