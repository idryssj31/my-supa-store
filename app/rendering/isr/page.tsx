import Link from "next/link";
import { cacheLife } from "next/cache";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

async function getIsrPageData() {
  "use cache";
  cacheLife({ revalidate: 60 });

  const products = await getProducts();
  const generatedAt = new Date().toISOString();

  return { products, generatedAt };
}

export default async function IsrRenderingPage() {
  const { products, generatedAt } = await getIsrPageData();

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Rendu ISR (étape 02)</h1>
      <p className={styles.subtitle}>
        Avec <code>cacheComponents: true</code>, on utilise{" "}
        <code>&quot;use cache&quot;</code> + <code>cacheLife(&#123; revalidate: 60 &#125;)</code>{" "}
        au lieu de <code>export const revalidate = 60</code>. Modifiez un prix
        dans Prisma Studio, attendez ~60 s, puis rafraîchissez.
      </p>
      <p className={styles.timestamp}>
        Dernière génération : <time dateTime={generatedAt}>{generatedAt}</time>
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
