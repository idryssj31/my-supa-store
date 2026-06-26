import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/product/SponsoredProducts";
import { getProducts } from "@/lib/queries/products";
import styles from "./page.module.css";

async function HomeProductGrid() {
  await connection();
  const products = await getProducts();

  return (
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
  );
}

function HomeProductGridSkeleton() {
  return <div className={styles.skeletonGrid} aria-busy="true" />;
}

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts />
      </Suspense>

      <h1 className={styles.title}>Nos produits</h1>
      <Suspense fallback={<HomeProductGridSkeleton />}>
        <HomeProductGrid />
      </Suspense>
    </div>
  );
}
