import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "GeoWeather",
  description: "A modern weather app",
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
      </body>
    </html>
  );
}
