import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/product/SponsoredProducts";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts />
      </Suspense>

      <h1 className={styles.title}>Nos produits</h1>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.slug} className={styles.card}>
            <Link href={`/products/${product.slug}`} className={styles.cardLink}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className={styles.image}
              />
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.price}>{product.price.toFixed(2)} €</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
