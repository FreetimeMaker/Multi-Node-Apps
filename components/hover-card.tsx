"use client";

import Image from "next/image";

interface HoverCardProps {
  src: string;
  alt: string;
  label: string;
  size: number;
  link?: string;
}

/**
 * Ein runder Logo-Karten-Baustein wie im Original:
 * Beim Hover wird das Bild skaliert und der Beschriftungstext eingeblendet.
 */
export default function HoverCard({ src, alt, label, size, link }: HoverCardProps) {
  const img = (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="block h-auto max-w-[250px] rounded-full bg-img-bg object-contain p-2 transition-transform duration-300 group-hover:scale-110"
    />
  );

  return (
    <div className="group relative flex flex-col items-center text-center">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {img}
        </a>
      ) : (
        img
      )}
      <h2 className="mt-1 text-center text-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </h2>
    </div>
  );
}
