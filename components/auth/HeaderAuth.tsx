"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import styles from "../header.module.css";

type HeaderAuthProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  trigram?: string;
};

export function HeaderAuth({ isLoggedIn, isAdmin, trigram }: HeaderAuthProps) {
  return (
    <>
      {isAdmin && (
        <Link href="/admin" className={styles.link}>
          Admin
        </Link>
      )}

      {isLoggedIn ? (
        <>
          <span className={styles.trigram} title="Trigramme utilisateur">
            {trigram}
          </span>
          <button
            type="button"
            className={styles.signOut}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className={styles.link}>
            Connexion
          </Link>
          <Link href="/register" className={styles.link}>
            Inscription
          </Link>
        </>
      )}
    </>
  );
}
