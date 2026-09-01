import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://free-time.me"),
  title: {
    default: "My Portfolio | Freetime Maker",
    template: "%s | Freetime Maker",
  },
  description:
    "Portfolio of Freetime Maker — a developer creating Web and Android apps and open-source projects like GeoWeather, SuperSMP Companion and FreetimeSDK.",
  applicationName: "Freetime Maker Portfolio",
  authors: [{ name: "Freetime Maker", url: "https://github.com/FreetimeMaker" }],
  creator: "Freetime Maker",
  publisher: "Freetime Maker",
  generator: "Next.js",
  keywords: [
    "Freetime Maker",
    "portfolio",
    "web developer",
    "android developer",
    "open source",
    "GeoWeather",
    "SuperSMP Companion",
    "FreetimeSDK",
    "Java",
    "Kotlin",
    "HTML",
    "CSS",
    "C#",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://free-time.me",
    siteName: "Freetime Maker",
    title: "My Portfolio | Freetime Maker",
    description:
      "Portfolio of Freetime Maker — Web and Android developer behind GeoWeather, SuperSMP Companion and FreetimeSDK.",
    images: [
      {
        url: "/app/public/images/geoweather.png",
        width: 256,
        height: 256,
        alt: "Freetime Maker Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio | Freetime Maker",
    description:
      "Portfolio of Freetime Maker — Web and Android developer behind GeoWeather, SuperSMP Companion and FreetimeSDK.",
    images: ["/images/geoweather.png"],
  },
  verification: {
    google: "G-E05VRR273J",
  },
  icons: {
    icon: [
      { url: "/Icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/Icons/favicon.ico", type: "image/x-icon" },
      { url: "/Icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/Icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/Icons/apple-touch-icon.png",
  },
  manifest: "/Icons/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.add(d?'dark':'light');}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
