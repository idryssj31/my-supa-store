import Link from "next/link";
import { connection } from "next/server";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

export default async function DynamicRenderingPage() {
  await connection();

  const products = await getProducts();
  const generatedAt = new Date().toISOString();

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Rendu dynamique (étape 03)</h1>
      <p className={styles.subtitle}>
        Avec <code>cacheComponents: true</code>, on utilise{" "}
        <code>await connection()</code> au lieu de{" "}
        <code>export const dynamic = &quot;force-dynamic&quot;</code>. La page
        est recalculée à chaque requête. Comparez le TTFB avec{" "}
        <Link href="/rendering/isr">/rendering/isr</Link>.
      </p>
      <p className={styles.timestamp}>
        Généré à l&apos;instant : <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <span> — {product.price.toFixed(2)} €</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
