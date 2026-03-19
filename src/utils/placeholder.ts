// @ts-ignore - sharp is available at runtime via Astro's dependency
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const cache = new Map<string, string>();

/**
 * Generates a tiny blurred base64 placeholder for an image.
 * Runs at build time only (server-side).
 */
export async function getPlaceholder(src: string): Promise<string> {
  if (cache.has(src)) return cache.get(src)!;

  const filePath = join(process.cwd(), "public", src);
  const buffer = await readFile(filePath);

  const placeholder = await sharp(buffer)
    .resize(20, 20, { fit: "inside" })
    .blur(3)
    .toFormat("webp", { quality: 20 })
    .toBuffer();

  const base64 = `data:image/webp;base64,${placeholder.toString("base64")}`;
  cache.set(src, base64);
  return base64;
}
