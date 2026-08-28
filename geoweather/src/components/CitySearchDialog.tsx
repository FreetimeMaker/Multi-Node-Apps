"use client";

import { useEffect, useRef, useState } from "react";
import type { GeoLocation } from "@/lib/types";
import { cityLabel, searchCities } from "@/lib/api";
import { useCities } from "@/components/CitiesContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CitySearchDialog({ open, onClose }: Props) {
  const { addCity } = useCities();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSearched(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSearch = async () => {
    if (query.trim().length < 2) return;
    setBusy(true);
    setSearched(true);
    try {
      const r = await searchCities(query.trim());
      setResults(r);
    } catch {
      setResults([]);
    } finally {
      setBusy(false);
    }
  };

  const handleAdd = (loc: GeoLocation) => {
    addCity(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Search for a City and Add it
        </h2>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter City (For Example: Berlin, Paris, New York)"
          className="w-full border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-purple-500 transition mb-6"
        />

        {busy && (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-purple-500" />
          </div>
        )}

        {!busy && searched && results.length === 0 && (
          <p className="py-4 text-center text-gray-500">No matching cities found.</p>
        )}

        {!busy && results.length > 0 && (
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 mb-4">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => handleAdd(r)}
                className="flex w-full items-center justify-between px-2 py-3 text-left hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-500">{cityLabel(r)}</p>
                </div>
                <span className="text-sm font-medium text-purple-600">Add</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSearch}
            disabled={query.trim().length < 2 || busy}
            className="rounded-lg bg-gray-200 px-8 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
          >
            SEARCH
          </button>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
