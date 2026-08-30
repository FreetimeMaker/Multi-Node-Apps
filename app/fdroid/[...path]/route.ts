import { head } from '@vercel/blob';

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const blobPath = `fdroid/repo/${params.path.join('/')}`;

  try {
    const blob = await head(blobPath, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const upstream = await fetch(blob.url);
    const body = await upstream.arrayBuffer();

    return new Response(body, {
      headers: {
        'Content-Type': blob.contentType ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}