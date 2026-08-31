import fs from "node:fs";
import path from "node:path";
import type { GetStaticProps } from "next";
import Head from "next/head";

type RepoProps = {
  markup: string;
};

// Basispfad zu den statischen Dateien in public/repo
const REPO_BASE = "/repo";

export const getStaticProps: GetStaticProps<RepoProps> = async () => {
  const filePath = path.join(process.cwd(), "public", "repo", "index.html");
  let markup = "";

  try {
    if (fs.existsSync(filePath)) {
      markup = fs.readFileSync(filePath, "utf8");

      // HTML-Wrapper entfernen
      markup = markup
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<head[\s\S]*?<\/head>/gi, "")
        .replace(/<\/?body[^>]*>/gi, "");

      // Pfade für Bilder und Links auf REPO_BASE umschreiben
      markup = markup
        .replace(/src=["']\.\/([^"']+)["']/g, `src="${REPO_BASE}/$1"`)
        .replace(/src=["'](?!http|https|\/)([^"']+)["']/g, `src="${REPO_BASE}/$1"`)
        .replace(/href=["']\.\/([^"']+)["']/g, `href="${REPO_BASE}/$1"`);
    } else {
      markup = `<p style="padding: 20px; font-family: sans-serif;">Datei nicht gefunden unter: ${filePath}</p>`;
    }
  } catch (error) {
    markup = `<p style="padding: 20px; font-family: sans-serif;">Fehler beim Laden: ${String(error)}</p>`;
  }

  return { props: { markup } };
};

export default function FdroidRepoPage({ markup }: RepoProps) {
  return (
    <>
      <Head>
        <title>Freetime Repository &mdash; F-Droid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index,nofollow" />
        {/* Hier explizit auf index.css verweisen */}
        <link rel="stylesheet" href={`${REPO_BASE}/index.css`} />
        <link rel="icon" href={`${REPO_BASE}/icons/icon.png`} type="image/png" />
      </Head>
      <div 
        className="fdroid-repo-wrapper"
        dangerouslySetInnerHTML={{ __html: markup }} 
      />
    </>
  );
}