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
import { getSimilarProducts } from "@/lib/queries/similar";
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
  const [product, similarProducts] = await Promise.all([
    getProductBySlug(slug),
    getSimilarProducts(slug),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
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

          <AddToCartButton
            productSlug={product.slug}
            productName={product.name}
          />
        </div>
      </article>

      {similarProducts.length > 0 && (
        <section className={styles.similar}>
          <h2 className={styles.similarTitle}>Maillots similaires</h2>
          <ul className={styles.similarGrid}>
            {similarProducts.map((similar) => (
              <li key={similar.slug} className={styles.similarCard}>
                <Link
                  href={`/products/${similar.slug}`}
                  className={styles.similarLink}
                >
                  <Image
                    src={similar.image}
                    alt={similar.name}
                    width={200}
                    height={200}
                    className={styles.similarImage}
                  />
                  <h3 className={styles.similarName}>{similar.name}</h3>
                  <p className={styles.similarPrice}>
                    {similar.price.toFixed(2)} €
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
