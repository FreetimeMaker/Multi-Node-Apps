import "./globals.css";

export const metadata = {
  title: "Sol Arcade",
  description: "Log in with your Solana wallet, mint your Arcade Pass & play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}