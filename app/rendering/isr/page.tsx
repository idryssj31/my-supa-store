import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function IsrRenderingPage() {
  const products = await getProducts();
  const generatedAt = new Date().toISOString();

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Rendu ISR (étape 02)</h1>
      <p className={styles.subtitle}>
        Cette page utilise <code>export const revalidate = 60</code>. Elle est
        régénérée au plus toutes les 60 secondes après une requête. Modifiez un
        prix dans Prisma Studio, attendez ~60 s, puis rafraîchissez.
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
