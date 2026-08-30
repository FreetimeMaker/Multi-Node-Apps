import fs from "node:fs";
import path from "node:path";
import type { GetStaticProps } from "next";
import Head from "next/head";

type RepoProps = {
  markup: string;
};

const REPO_BASE = process.env.NEXT_PUBLIC_REPO_BASE || "/fdroid/repo";

export const getStaticProps: GetStaticProps<RepoProps> = async () => {
  const file = path.join(process.cwd(), "public", "repo", "index.html");
  let markup = "<p>No repository index found at public/repo/index.html.</p>";
  try {
    markup = fs.readFileSync(file, "utf8");
  } catch {
    // keep the build green if the F-Droid index was never generated
  }
  markup = markup
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!DOCTYPE[^>]*>/i, "")
    .replace(/<base\b[^>]*>/i, `<base href="${REPO_BASE}/">`);

  return { props: { markup } };
};

export default function FdroidRepoPage({ markup }: RepoProps) {
  return (
    <>
      <Head>
        <title>Freetime Repository &mdash; F-Droid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index,nofollow" />
        <link rel="icon" href={`${REPO_BASE}/icons/icon.png`} type="image/png" />
        <style>{`[data-fdroid-repo]{font-family:Arial,Helvetica,Sans-Serif;font-size:14px;color:#0000ee;background-color:#fff;padding:16px;}[data-fdroid-repo] a{color:#bb0000;}`}</style>
      </Head>
      <div data-fdroid-repo dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}