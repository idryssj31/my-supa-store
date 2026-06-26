import Image from "next/image";
import Link from "next/link";
import { fetchSponsoredProducts } from "@/lib/queries/sponsored";
import styles from "./sponsored-banner.module.css";

type SponsoredBannerProps = {
  slug: string;
};

export async function SponsoredBanner({ slug }: SponsoredBannerProps) {
  const sponsoredProducts = await fetchSponsoredProducts(slug);

  if (sponsoredProducts.length === 0) {
    return null;
  }

  return (
    <aside className={styles.banner} aria-label="Offres sponsorisées">
      <p className={styles.label}>Sponsorisé · GraphQL mock</p>
      <ul className={styles.list}>
        {sponsoredProducts.map((product) => (
          <li key={product.slug} className={styles.item}>
            <Link href={`/products/${product.slug}`} className={styles.link}>
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
            </Link>
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
