import styles from "./sponsored-banner.module.css";

const SPONSORED_LOAD_DELAY_MS = 1200;

type SponsoredBannerProps = {
  slug: string;
};

export async function SponsoredBanner({ slug }: SponsoredBannerProps) {
  await new Promise((resolve) => setTimeout(resolve, SPONSORED_LOAD_DELAY_MS));

  return (
    <aside className={styles.banner} aria-label="Offre sponsorisée">
      <p className={styles.label}>Sponsorisé</p>
      <p className={styles.text}>
        Découvrez la collection complète — offre spéciale sur les maillots
        sélectionnés pour <strong>{slug.replaceAll("-", " ")}</strong>.
      </p>
    </aside>
  );
}

export function SponsoredBannerSkeleton() {
  return (
    <div
      className={styles.skeleton}
      aria-busy="true"
      aria-label="Chargement de la bannière sponsorisée"
    />
  );
}
