import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Hello, I'm Freetime Maker and I like to make Web and Android Apps.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
