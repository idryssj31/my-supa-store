import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

export default async function StaticRenderingPage() {
  const products = await getProducts();
  const generatedAt = new Date().toISOString();

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Rendu statique (étape 01)</h1>
      <p className={styles.subtitle}>
        Cette page est générée au build. Le timestamp ci-dessous ne change pas
        tant que vous ne relancez pas <code>npm run build</code>.
      </p>
      <p className={styles.timestamp}>
        Généré le : <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <span> — pré-généré via generateStaticParams</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
