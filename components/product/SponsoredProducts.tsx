import Image from "next/image";
import { ProductCard } from "@/components/navigation/ProductCard";
import { getAbVariant } from "@/lib/ab/variant";
import { fetchSponsoredProducts } from "@/lib/queries/sponsored";
import styles from "./sponsored-products.module.css";

export async function SponsoredProducts() {
  const [sponsoredProducts, variant] = await Promise.all([
    fetchSponsoredProducts(),
    getAbVariant(),
  ]);

  if (sponsoredProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="Produits sponsorisés">
      <h2 className={styles.title}>Sélection sponsorisée</h2>
      <p className={styles.subtitle}>
        Données chargées via mock GraphQL (<code>sponsoredProducts</code>)
      </p>
      <ul className={styles.grid}>
        {sponsoredProducts.map((product) => (
          <li key={product.slug} className={styles.card}>
            <ProductCard
              href={`/products/${product.slug}`}
              className={styles.link}
              variant={variant}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={220}
                height={220}
                className={styles.image}
              />
              <p className={styles.headline}>{product.headline}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>{product.price.toFixed(2)} €</p>
            </ProductCard>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SponsoredProductsSkeleton() {
  return (
    <section
      className={styles.section}
      aria-busy="true"
      aria-label="Chargement des produits sponsorisés"
    >
      <h2 className={styles.title}>Sélection sponsorisée</h2>
      <ul className={styles.grid}>
        {Array.from({ length: 2 }).map((_, index) => (
          <li key={index} className={styles.skeletonCard} />
        ))}
      </ul>
    </section>
  );
}
