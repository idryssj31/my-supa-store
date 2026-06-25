"use client";

import styles from "./error.module.css";

export default function ProductsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <p>Erreur lors du chargement des produits.</p>
      <button type="button" className={styles.button} onClick={reset}>
        Réessayer
      </button>
    </div>
  );
}
