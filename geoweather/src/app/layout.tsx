import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from "next/script";

export const metadata = {
  title: "GeoWeather",
  description: "A modern weather app",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen font-sans text-white"
        style={{
          background: "linear-gradient(to bottom, #4bc1f6 0%, #3a71e9 50%, #b8b7c8 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <Providers>{children}</Providers>

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E05VRR273J"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E05VRR273J');
          `}
        </Script>
      </body>
    </html>
  );
}
