import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Freetime Maker with donations in Crypto (Bitcoin, Ethereum, Litecoin, Dogecoin, Tron, Shiba, USDC, USDT), via OxaPay or GitHub Sponsors.",
  alternates: {
    canonical: "/don",
  },
  keywords: ["Freetime Maker", "donate", "support", "crypto", "Bitcoin", "GitHub Sponsors", "OxaPay"],
  openGraph: {
    title: "Donate | Freetime Maker",
    description:
      "Support Freetime Maker with donations in Crypto, via OxaPay or GitHub Sponsors.",
    url: "https://free-time.me/don",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/don-images/Icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/Icons/favicon.ico", type: "image/x-icon" },
      { url: "/Icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/Icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/Icons/apple-touch-icon.png",
  },
  manifest: "/Icons/site.webmanifest",
};

interface DonationItem {
  img: string;
  alt: string;
  title: string;
  desc: string;
  href: string;
  button: string;
}

const items: DonationItem[] = [
  { img: "/btc.png", alt: "Bitcoin", title: "Donate Bitcoin", desc: "Anything", href: "https://ncwallet.net/pay/60misly", button: "Donate Bitcoin" },
  { img: "/eth.png", alt: "Ethereum", title: "Donate Ethereum", desc: "Anything", href: "https://ncwallet.net/pay/86fremd", button: "Donate Ethereum" },
  { img: "/usdt.png", alt: "Tether/USDT", title: "Donate Tether/USDT", desc: "Anything", href: "https://ncwallet.net/pay/19tacit", button: "Donate Tether/USDT" },
  { img: "/usdc.png", alt: "USDC", title: "Donate USDC", desc: "Anything", href: "https://ncwallet.net/pay/15snog", button: "Donate USDC" },
  { img: "/shib.png", alt: "Shib", title: "Donate Shib", desc: "Anything", href: "https://ncwallet.net/pay/18spile", button: "Donate Shib" },
  { img: "/tron.png", alt: "Tron", title: "Donate Tron", desc: "Anything", href: "https://ncwallet.net/pay/15gown", button: "Donate Tron" },
  { img: "/ltc.png", alt: "Litecoin", title: "Donate Litecoin", desc: "Anything", href: "https://ncwallet.net/pay/77pudgy", button: "Donate Litecoin" },
  { img: "/doge.png", alt: "Doge", title: "Donate Doge", desc: "Anything", href: "https://ncwallet.net/pay/30allie", button: "Donate Doge" },
  { img: "/oxa.png", alt: "OxaPay Logo", title: "Donate via OxaPay", desc: "Anything", href: "https://pay.oxapay.com/13038067", button: "Donate via OxaPay" },
  { img: "/gh.png", alt: "GitHub Logo", title: "Donate via GitHub Sponsors", desc: "Anything", href: "https://github.com/sponsors/FreetimeMaker", button: "Donate via GitHub Sponsors" },
  { img: "/back.png", alt: "Go Back to the Mainsite", title: "Go Back to the Mainsite", desc: "Go Back", href: "..", button: "Go Back to the Mainsite"},
];

export default function DonatePage() {
  return (
    <div className="m-0 min-h-screen bg-[#f4f4f4] p-0 font-sans text-inherit">
      <header className="bg-[#333] p-4 text-center text-white">
        <h1 className="text-2xl">Donate to me</h1>
      </header>

      <main>
        <section id="products" className="flex flex-wrap justify-center gap-4 p-4">
          {items.map((item) => (
            <div
              key={item.button}
              className="w-[200px] rounded-[10px] bg-white p-4 text-center shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.alt} width={150} className="mx-auto" />
              <h3 className="text-black">{item.title}</h3>
              <p className="text-black">{item.desc}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <button className="cursor-pointer rounded-[5px] border-none bg-[#007bff] px-4 py-2 text-white">
                  {item.button}
                </button>
              </a>
            </div>
          ))}
        </section>
      </main>

      <footer className="py-4 text-center">&copy;  2026 Freetime Maker</footer>
    </div>
  );
}
