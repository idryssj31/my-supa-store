import Image from "next/image";
import { ProductCard } from "@/components/navigation/ProductCard";
import { getAbVariant } from "@/lib/ab/variant";
import { getSimilarProducts } from "@/lib/queries/similar";
import styles from "./similar-products.module.css";

type SimilarProductsProps = {
  slug: string;
};

export async function SimilarProducts({ slug }: SimilarProductsProps) {
  const [similarProducts, variant] = await Promise.all([
    getSimilarProducts(slug),
    getAbVariant(),
  ]);

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.similar}>
      <h2 className={styles.title}>Maillots similaires</h2>
      <ul className={styles.grid}>
        {similarProducts.map((similar) => (
          <li key={similar.slug} className={styles.card}>
            <ProductCard
              href={`/products/${similar.slug}`}
              className={styles.link}
              variant={variant}
            >
              <Image
                src={similar.image}
                alt={similar.name}
                width={200}
                height={200}
                className={styles.image}
              />
              <h3 className={styles.name}>{similar.name}</h3>
              <p className={styles.price}>{similar.price.toFixed(2)} €</p>
            </ProductCard>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SimilarProductsSkeleton() {
  return (
    <section className={styles.similar} aria-busy="true" aria-label="Chargement des maillots similaires">
      <h2 className={styles.title}>Maillots similaires</h2>
      <ul className={styles.grid}>
        {Array.from({ length: 2 }).map((_, index) => (
          <li key={index} className={styles.skeletonCard} />
        ))}
      </ul>
    </section>
  );
}
