import type { Metadata } from "next";
import Link from "next/link";
import HoverCard from "@/components/hover-card";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Hello, I'm Freetime Maker and I like to make Web and Android Apps.",
};

const languagesRow1 = [
  { src: "/images/java.png", alt: "Java Logo", label: "Java" },
  { src: "/images/html.png", alt: "HTML Logo", label: "HTML 5" },
  { src: "/images/cs.png", alt: "C# Logo", label: "C#" },
  { src: "/images/css.png", alt: "CSS Logo", label: "CSS" },
];

const languagesRow2 = [
  { src: "/images/gh.png", alt: "GitHub Logo", label: "GitHub" },
  { src: "/images/git.png", alt: "Git Logo", label: "Git" },
  { src: "/images/gitlab.png", alt: "GitLab Logo", label: "GitLab" },
  { src: "/images/kt.png", alt: "Kotlin Logo", label: "Kotlin" },
  { src: "/images/linux.png", alt: "Linux Logo", label: "Linux" },
];

const projects = [
  { src: "/images/geoweather.png", alt: "GeoWeather Logo", label: "GeoWeather" },
  { src: "/images/ssmpc.png", alt: "SuperSMP Companion Logo", label: "SuperSMP Companion" },
  { src: "/images/freetimesdk.png", alt: "FreetimeSDK Logo", label: "FreetimeSDK" },
];

const geoWeatherPics = [
  { src: "/images/geoweatheraction1.png", alt: "First Picture of GeoWeather in Action", label: "GeoWeather Homepage" },
  { src: "/images/geoweatheraction2.png", alt: "Second Picture of GeoWeather in Action", label: "GeoWeather Searchpage" },
  { src: "/images/geoweatheraction3.png", alt: "Third Picture of GeoWeather in Action", label: "GeoWeather Weatherpage 1" },
  { src: "/images/geoweatheraction4.png", alt: "Fourth Picture of GeoWeather in Action", label: "GeoWeather Weatherpage 2" },
];

const ssmpcPics = [
  { src: "/images/ssmpcaction1.png", alt: "First Picture of SuperSMP Companion in Action", label: "SuperSMP Companion Shoppage with Cookies Text" },
  { src: "/images/ssmpcaction2.png", alt: "Second Picture of SuperSMP Companion in Action", label: "SuperSMP Companion Shopspage without Cookies Text" },
  { src: "/images/ssmpcaction3.png", alt: "Third Picture of SuperSMP Companion in Action", label: "SuperSMP Mappage" },
];

export default function HomePage() {
  return (
    <>
      <ThemeToggle />
      <h1 className="anim-fade-in p-4 text-center">My Portfolio</h1>
      <p className="anim-fade-in-delay-1 p-4 text-center text-xl">
        Hello, I&apos;m Freetime Maker and I like to make Web and Android Apps.
      </p>
      <h1 className="anim-fade-in-delay-2 p-4 text-center">
        Here are Technologies I worked with listed.
      </h1>

      {/* Technologies */}
      <div className="anim-fade-in-delay-3 p-4">
        <div className="flex flex-wrap items-center justify-center gap-5 max-md:flex-col">
          {languagesRow1.map((l) => (
            <HoverCard key={l.label} {...l} size={180} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 max-md:flex-col">
          {languagesRow2.map((l) => (
            <HoverCard key={l.label} {...l} size={180} />
          ))}
        </div>
      </div>

      {/* Projects */}
      <h1 className="anim-text-appear p-4 text-center">
        Here are Projects that I&apos;ve made listed.
      </h1>
      <div className="anim-image-appear p-4">
        <div className="flex flex-wrap items-center justify-center gap-5 max-md:flex-col">
          {projects.map((p) => (
            <HoverCard key={p.label} {...p} size={250} />
          ))}
        </div>
      </div>

      {/* Projects in Action */}
      <h1 className="anim-text-appear p-4 text-center">
        Here are the Projects I&apos;ve made in Action
      </h1>
      <div className="p-4">
        {/* GeoWeather in Action */}
        <div className="anim-image-appear flex flex-col items-center">
          <h1 className="my-10 text-center">Here you can see GeoWeather in Action.</h1>
          <div className="flex flex-wrap items-center justify-center gap-5 max-md:flex-col">
            {geoWeatherPics.map((p) => (
              <HoverCard key={p.label} {...p} size={200} />
            ))}
          </div>
        </div>

        {/* SuperSMP Companion in Action */}
        <div className="anim-image-appear flex flex-col items-center">
          <h1 className="my-10 text-center">Here you can see SuperSMP Companion in Action.</h1>
          <div className="flex flex-wrap items-center justify-center gap-5 max-md:flex-col">
            {ssmpcPics.map((p) => (
              <HoverCard key={p.label} {...p} size={250} />
            ))}
          </div>
        </div>

        {/* Project links */}
        <h1 className="anim-text-appear p-4 text-center">
          Here are URL&apos;s to the Projects I&apos;ve made.
        </h1>
        <div className="anim-text-appear flex flex-wrap items-center justify-center gap-5">
          <h2>
            <a
              className="text-gw-txt no-underline"
              href="https://github.com/FreetimeMaker/GeoWeather"
              target="_blank"
              rel="noopener noreferrer"
              title="Look at the Source Code of GeoWeather on GitHub."
            >
              GeoWeather on GitHub
            </a>
          </h2>
          <h2>
            <a
              className="text-ssmpc-txt no-underline"
              href="https://github.com/FreetimeMaker/SuperSMP-Companion-App"
              target="_blank"
              rel="noopener noreferrer"
              title="Look at the Source Code of SuperSMP Companion on GitHub."
            >
              SuperSMP Companion on GitHub
            </a>
          </h2>
          <h2>
            <a
              className="text-fsdk-txt no-underline"
              href="https://github.com/FreetimeMaker/FreetimeSDK"
              target="_blank"
              rel="noopener noreferrer"
              title="Look at the Source Code of FreetimeSDK on GitHub."
            >
              FreetimeSDK on GitHub
            </a>
          </h2>
        </div>

        {/* Other websites */}
        <h1 className="anim-text-appear p-4 text-center">Visit my other Websites</h1>
        <div className="flex flex-col items-center justify-center gap-5">
          <h2>
            <Link className="text-don-txt no-underline" href="/don" title="Donate to me.">
              Donate to me.
            </Link>
          </h2>
          <h2>
            <Link className="text-shop-txt no-underline" href="/fms" title="Visit my Shop.">
              Visit my Shop.
            </Link>
          </h2>
        </div>

        <footer className="mt-6 text-center">&copy;  2026 FreetimeMaker</footer>
      </div>
    </>
  );
}
