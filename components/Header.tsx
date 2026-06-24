import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import styles from "./header.module.css";
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          My Supa Store
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Accueil
          </Link>
          <Link href="/admin" className={styles.link}>
            Admin
          </Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
