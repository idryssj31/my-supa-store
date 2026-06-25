import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import {
  ProductTabs,
  ProductTabsFallback,
} from "@/components/product/ProductTabs";
import {
  getProductBySlug,
  getProductSlugs,
} from "@/lib/queries/products";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className={styles.product}>
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <Link href="/" className={styles.back}>
          ← Retour à la boutique
        </Link>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>{product.price.toFixed(2)} €</p>

        <Suspense fallback={<ProductTabsFallback />}>
          <ProductTabs
            slug={slug}
            description={product.description}
            specs={product.specs}
          />
        </Suspense>

        <AddToCartButton productName={product.name} />
      </div>
    </article>
  );
}
