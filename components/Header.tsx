import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { CartButton } from "@/components/cart/CartButton";
import { HeaderAuth } from "@/components/auth/HeaderAuth";
import styles from "./header.module.css";

async function HeaderContent() {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);
  const isAdmin = session?.user?.role === "ADMIN";

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
          <HeaderAuth
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            trigram={session?.user?.trigram}
          />
          <CartButton />
        </nav>
      </div>
    </header>
  );
}

function HeaderFallback() {
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
          <Link href="/login" className={styles.link}>
            Connexion
          </Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderContent />
    </Suspense>
  );
}
