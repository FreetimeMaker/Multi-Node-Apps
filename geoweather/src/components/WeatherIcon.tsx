import type { IconName } from "@/lib/weatherCodes";

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function WeatherIcon({ name, className = "w-8 h-8" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...s} aria-hidden="true">
      {name === "sun" && <g><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></g>}
      {name === "partly" && <g><circle cx="5" cy="8" r="3.2" fill="currentColor" stroke="none" /><path d="M5 1.5V3M5 13v1.5M0.5 8h1.5M8.5 8H10" /><path d="M17 10a6 6 0 0 1 5 2.5 4 4 0 0 1-3.5 6.5H10a4 4 0 0 1-.7-7.9A6 6 0 0 1 17 10z" /></g>}
      {name === "cloud" && <path d="M17.5 19a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 11 4.5 4.5 0 0 0 6 19h11.5z" />}
      {name === "fog" && <g><path d="M7 9h10M5 13h14M7 17h10" /></g>}
      {name === "drizzle" && <g><path d="M17.5 13a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 6.3 4.5 4.5 0 0 0 6.5 13" /><path d="M9 15l-1 2M13 15l-1 2M17 15l-1 2" /></g>}
      {name === "rain" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><path d="M9 15l-1.5 3M13 15l-1.5 3M17 15l-1.5 3" /></g>}
      {name === "freezing" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><circle cx="12" cy="18" r="2" /><path d="M12 12v2M12 22v1" /></g>}
      {name === "snow" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><path d="M9 15.5l.01.01M13 15.5l.01.01M17 15.5l.01.01M11 18.5l.01.01M15 18.5l.01.01" strokeWidth="2.2" /></g>}
      {name === "snowgrains" && <g><circle cx="12" cy="9" r="4" /><path d="M9 14.5l.01.01M13 14.5l.01.01M11 17l.01.01M15 17l.01.01" strokeWidth="2.2" /></g>}
      {name === "showers" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><path d="M15 14v2M9 14v2M12 14v3" /></g>}
      {name === "thunder" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><path d="M10 17l-1 4 4-4-2-1 3-2z" fill="currentColor" stroke="none" /></g>}
      {name === "haillight" && <g><path d="M17.5 12a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.3 5.3 4.5 4.5 0 0 0 6.5 12" /><circle cx="9" cy="17" r="1.2" fill="currentColor" stroke="none" /><circle cx="13" cy="19" r="1.2" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" /></g>}
      {!["sun","partly","cloud","fog","drizzle","rain","freezing","snow","snowgrains","showers","thunder","haillight"].includes(name) && <path d="M7 13h10M7 17h10" />}
    </svg>
  );
}
