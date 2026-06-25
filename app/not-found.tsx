import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Ce maillot ou cette page n&apos;existe pas.</p>
      <Link href="/" className={styles.link}>
        Retour à la boutique
      </Link>
    </div>
  );
}
