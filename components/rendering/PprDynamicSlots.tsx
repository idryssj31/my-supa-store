import Link from "next/link";
import { connection } from "next/server";
import { getProducts } from "@/lib/queries/products";
import styles from "./ppr-dynamic.module.css";

const DYNAMIC_DELAY_MS = 600;

export async function PprProductList() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, DYNAMIC_DELAY_MS));

  const products = await getProducts();
  const loadedAt = new Date().toISOString();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Produits (dynamique · Prisma)</h2>
      <p className={styles.meta}>
        Chargé le : <time dateTime={loadedAt}>{loadedAt}</time>
      </p>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <span> — {product.price.toFixed(2)} €</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function PprLiveTimestamp() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, DYNAMIC_DELAY_MS));

  const generatedAt = new Date().toISOString();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Horodatage live</h2>
      <p className={styles.timestamp}>
        <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
    </section>
  );
}

export function PprDynamicSkeleton() {
  return <div className={styles.skeleton} aria-busy="true" />;
}
