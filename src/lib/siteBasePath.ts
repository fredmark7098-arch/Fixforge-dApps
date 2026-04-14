/**
 * Static asset / router base (no trailing slash). Mirrors next.config `basePath`.
 * Kept separate from `getImagePath` so data modules can import this without
 * pulling the full image helper into every chunk (avoids webpack/RSC edge cases).
 */
export const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
