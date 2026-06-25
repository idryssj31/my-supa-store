import styles from "./loading.module.css";

export default function ProductsLoading() {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Chargement des produits">
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonLines}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
        <div className={styles.skeletonLine} />
      </div>
    </div>
  );
}
