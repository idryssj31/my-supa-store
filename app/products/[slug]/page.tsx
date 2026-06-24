import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
        <p className={styles.description}>{product.description}</p>
        <p className={styles.specs}>{product.specs}</p>
      </div>
    </article>
  );
}
