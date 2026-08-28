"use client";

import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-[9999] rounded-lg bg-btn-bg px-4 py-2.5 text-btn-text cursor-pointer hover:opacity-80"
      aria-label="Dark Mode umschalten"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
