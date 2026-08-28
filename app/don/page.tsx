import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate to me",
  description: "Support me with donations in Crypto, via OxaPay or GitHub Sponsors.",
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
  { img: "/don-images/btc.png", alt: "Bitcoin", title: "Donate Bitcoin", desc: "Anything", href: "https://ncwallet.net/pay/60misly", button: "Donate Bitcoin" },
  { img: "/don-images/eth.png", alt: "Ethereum", title: "Donate Ethereum", desc: "Anything", href: "https://ncwallet.net/pay/86fremd", button: "Donate Ethereum" },
  { img: "/don-images/usdt.png", alt: "Tether/USDT", title: "Donate Tether/USDT", desc: "Anything", href: "https://ncwallet.net/pay/19tacit", button: "Donate Tether/USDT" },
  { img: "/don-images/usdc.png", alt: "USDC", title: "Donate USDC", desc: "Anything", href: "https://ncwallet.net/pay/15snog", button: "Donate USDC" },
  { img: "/don-images/shib.png", alt: "Shib", title: "Donate Shib", desc: "Anything", href: "https://ncwallet.net/pay/18spile", button: "Donate Shib" },
  { img: "/don-images/tron.png", alt: "Tron", title: "Donate Tron", desc: "Anything", href: "https://ncwallet.net/pay/15gown", button: "Donate Tron" },
  { img: "/don-images/ltc.png", alt: "Litecoin", title: "Donate Litecoin", desc: "Anything", href: "https://ncwallet.net/pay/77pudgy", button: "Donate Litecoin" },
  { img: "/don-images/doge.png", alt: "Doge", title: "Donate Doge", desc: "Anything", href: "https://ncwallet.net/pay/30allie", button: "Donate Doge" },
  { img: "/don-images/oxa.png", alt: "OxaPay Logo", title: "Donate via OxaPay", desc: "Anything", href: "https://pay.oxapay.com/13038067", button: "Donate via OxaPay" },
  { img: "/don-images/gh.png", alt: "GitHub Logo", title: "Donate via GitHub Sponsors", desc: "Anything", href: "https://github.com/sponsors/FreetimeMaker", button: "Donate via GitHub Sponsors" },
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
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <button className="cursor-pointer rounded-[5px] border-none bg-[#007bff] px-4 py-2 text-white">
                  {item.button}
                </button>
              </a>
            </div>
          ))}

          {/* Go Back */}
          <div className="w-[200px] rounded-[10px] bg-white p-4 text-center shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
            <p className="text-center text-6xl">←</p>
            <h3>Go Back</h3>
            <p>Go Back to the Main Page</p>
            <Link href="/">
              <button className="cursor-pointer rounded-[5px] border-none bg-[#007bff] px-4 py-2 text-white">
                Go Back
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-4 text-center">&copy;  2025 Freetime Maker</footer>
    </div>
  );
}
