import { unstable_cache } from "next/cache";
import { computePrimesWithTiming } from "@/lib/eratosthene";

const PRIME_LIMIT = 500_000;

async function computePrimesForCache(limit: number) {
  return computePrimesWithTiming(limit);
}

export async function getCachedPrimes(limit: number = PRIME_LIMIT) {
  const cachedCompute = unstable_cache(
    async () => computePrimesForCache(limit),
    ["primes", String(limit)],
    { revalidate: 3600 },
  );

  const result = await cachedCompute();
  return { ...result, fromCache: true as const };
}

export function getUncachedPrimes(limit: number = PRIME_LIMIT) {
  const result = computePrimesWithTiming(limit);
  return { ...result, fromCache: false as const };
}
