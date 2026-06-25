"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./product-tabs.module.css";

type ProductTabsProps = {
  slug: string;
  description: string;
  specs: string;
};

export function ProductTabs({ slug, description, specs }: ProductTabsProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tab === "specs" ? "specs" : "description";

  return (
    <>
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
        {activeTab === "specs" ? <p>{specs}</p> : <p>{description}</p>}
      </div>
    </>
  );
}

export function ProductTabsFallback() {
  return <div className={styles.fallback}>Chargement des onglets…</div>;
}
