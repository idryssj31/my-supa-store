import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getProductBySlug } from "@/lib/queries/products";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { tab } = await searchParams;
  const activeTab = tab === "specs" ? "specs" : "description";

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

        <nav className={styles.tabs} aria-label="Informations produit">
          <Link
            href={`/products/${slug}?tab=description`}
            className={activeTab === "description" ? styles.tabActive : styles.tab}
          >
            Description
          </Link>
          <Link
            href={`/products/${slug}?tab=specs`}
            className={activeTab === "specs" ? styles.tabActive : styles.tab}
          >
            Spécifications
          </Link>
        </nav>

        <div className={styles.tabContent}>
          {activeTab === "specs" ? (
            <p>{product.specs}</p>
          ) : (
            <p>{product.description}</p>
          )}
        </div>

        <AddToCartButton productName={product.name} />
      </div>
    </article>
  );
}
