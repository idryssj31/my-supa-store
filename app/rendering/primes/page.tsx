import Link from "next/link";
import { connection } from "next/server";
import { getCachedPrimes, getUncachedPrimes } from "@/lib/queries/primes";
import styles from "./page.module.css";

const PRIME_LIMIT = 500_000;

export default async function PrimesRenderingPage() {
  await connection();

  const uncached = getUncachedPrimes(PRIME_LIMIT);
  const cachedFirst = await getCachedPrimes(PRIME_LIMIT);
  const cachedSecond = await getCachedPrimes(PRIME_LIMIT);

  const samples = uncached.primes.slice(0, 12);

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>unstable_cache (étape 10)</h1>
      <p className={styles.subtitle}>
        Crible d&apos;Ératosthène jusqu&apos;à{" "}
        <strong>{PRIME_LIMIT.toLocaleString("fr-FR")}</strong>. Comparez le calcul
        direct vs <code>unstable_cache(fn, [&quot;primes&quot;], &#123; revalidate: 3600 &#125;)</code>.
      </p>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Sans cache</h2>
          <p className={styles.metric}>
            {uncached.durationMs.toFixed(1)} ms
          </p>
          <p className={styles.detail}>
            {uncached.primes.length.toLocaleString("fr-FR")} nombres premiers trouvés
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>unstable_cache — 1er appel</h2>
          <p className={styles.metric}>
            {cachedFirst.durationMs.toFixed(1)} ms
          </p>
          <p className={styles.detail}>
            Miss cache (calcul puis stockage, revalidate 3600 s)
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>unstable_cache — 2e appel</h2>
          <p className={styles.metric}>
            {cachedSecond.durationMs.toFixed(1)} ms
          </p>
          <p className={styles.detail}>
            Hit cache — devrait être nettement plus rapide
          </p>
        </section>
      </div>

      <p className={styles.sample}>
        Premiers nombres premiers : {samples.join(", ")}…
      </p>
    </div>
  );
}
