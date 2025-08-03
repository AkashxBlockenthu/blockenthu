import { CacheItem, AffinityMatch } from '../types';

/**
 * Calculate TTL 2 days from now
 */
export function getTTL2DaysFromNow(): number {
  return Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60; // 2 days in seconds
}

/**
 * Normalize LinkedIn URL to extract the key part
 */
export function normalizeLinkedInURL(url: string): string | null {
  const normalizedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, ''); // Remove protocol and "www"
  const match = normalizedUrl.match(/linkedin\.com\/in\/([^/?]+)/i); // Extract the key part
  return match ? match[1].toLowerCase() : null;
}

/**
 * Format cache data for API response
 */
export function formatCacheData(cache: CacheItem): { data: { exact: AffinityMatch[]; fuzzy: AffinityMatch[] } } {
  const formattedData = {
    data: {
      exact: [] as AffinityMatch[],
      fuzzy: [] as AffinityMatch[]
    }
  };

  if (cache.cacheType === "exact") {
    formattedData.data.exact = cache.opportunities.map(opp => ({
      id: opp.opportunityId,
      name: opp.name
    }));
  } else {
    formattedData.data.fuzzy = cache.opportunities
      .slice(0, 15) // Limit fuzzy results to 15
      .map(opp => ({
        id: opp.opportunityId,
        name: opp.name
      }));
  }

  return formattedData;
} 