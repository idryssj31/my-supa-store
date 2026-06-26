export function sieveOfEratosthenes(limit: number): number[] {
  if (limit < 2) {
    return [];
  }

  const sieve = new Uint8Array(limit + 1);
  const primes: number[] = [];

  for (let candidate = 2; candidate <= limit; candidate++) {
    if (sieve[candidate]) {
      continue;
    }

    primes.push(candidate);

    for (let multiple = candidate * candidate; multiple <= limit; multiple += candidate) {
      sieve[multiple] = 1;
    }
  }

  return primes;
}

export function computePrimesWithTiming(limit: number) {
  const start = performance.now();
  const primes = sieveOfEratosthenes(limit);
  const durationMs = performance.now() - start;

  return { primes, durationMs, limit };
}
