import { APP_STORE_ID } from './url';

export interface AppRating {
  /** Average rating rounded to one decimal, e.g. "4.4". */
  value: string;
  /** Total number of ratings, e.g. 794. */
  count: number;
}

// Used when the lookup fails, so a flaky network never breaks the build.
const FALLBACK: AppRating = { value: '4.4', count: 794 };

/**
 * Fetch the US App Store rating at build time from Apple's public iTunes Lookup API.
 */
export async function getAppRating(): Promise<AppRating> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const app = (await res.json()).results?.[0];
    const average = Number(app?.averageUserRating);
    const count = Number(app?.userRatingCount);
    if (!average || !count) throw new Error('missing rating fields');
    return { value: average.toFixed(1), count };
  } catch (error) {
    console.warn(`[rating] Falling back to hardcoded rating: ${error}`);
    return FALLBACK;
  }
}

/** Format a rating count the way the App Store does: 794, 1.5K, 12K. */
export function formatRatingCount(count: number): string {
  if (count < 1000) return String(count);
  const thousands = Math.floor(count / 100) / 10;
  return `${thousands >= 10 ? Math.floor(thousands) : thousands}K`;
}
