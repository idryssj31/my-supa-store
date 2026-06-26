import Image from "next/image";
import { ProductCard } from "@/components/navigation/ProductCard";
import { getAbVariant } from "@/lib/ab/variant";
import { fetchSponsoredProducts } from "@/lib/queries/sponsored";
import styles from "./sponsored-banner.module.css";

type SponsoredBannerProps = {
  slug: string;
};

export async function SponsoredBanner({ slug }: SponsoredBannerProps) {
  const [sponsoredProducts, variant] = await Promise.all([
    fetchSponsoredProducts(slug),
    getAbVariant(),
  ]);

  if (sponsoredProducts.length === 0) {
    return null;
  }

  return (
    <aside className={styles.banner} aria-label="Offres sponsorisées">
      <p className={styles.label}>Sponsorisé · GraphQL mock</p>
      <ul className={styles.list}>
        {sponsoredProducts.map((product) => (
          <li key={product.slug} className={styles.item}>
            <ProductCard
              href={`/products/${product.slug}`}
              className={styles.link}
              variant={variant}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className={styles.image}
              />
              <div>
                <p className={styles.headline}>{product.headline}</p>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>{product.price.toFixed(2)} €</p>
              </div>
            </ProductCard>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function SponsoredBannerSkeleton() {
  return (
    <div
      className={styles.skeleton}
      aria-busy="true"
      aria-label="Chargement des offres sponsorisées"
    />
  );
}
