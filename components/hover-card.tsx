"use client";

import Image from "next/image";

interface HoverCardProps {
  src: string;
  alt: string;
  label: string;
  size: number;
  variant?: "lang" | "project" | "geow" | "ssmpc";
  className?: string;
}

/**
 * Ein runder Logo-Karten-Baustein wie im Original:
 * Beim Hover wird das Bild skaliert und der Beschriftungstext eingeblendet.
 * Die Bilder sind anfangs versteckt sichtbar und erscheinen erst beim Hover.
 */
export default function HoverCard({
  src,
  alt,
  label,
  size,
  variant = "lang",
  className,
}: HoverCardProps) {
  const picClass =
    variant === "lang"
      ? "langpic"
      : variant === "project"
        ? "projectpic"
        : variant === "geow"
          ? "geowactpic"
          : "ssmpcactpic";

  return (
    <div
      className={`lang-card group relative m-2.5 flex flex-col items-center text-center max-[480px]:m-0 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={picClass}
      />
      <h2
        className="mt-1 invisible opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100"
        style={{ maxWidth: size }}
      >
        {label}
      </h2>
    </div>
  );
}
