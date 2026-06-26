import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import styles from "../auth-pages.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Inscription</h1>
      <p className={styles.subtitle}>
        Créez un compte. Le trigramme sera généré à partir de votre nom.
      </p>
      <RegisterForm />
      <p className={styles.footer}>
        Déjà inscrit ? <Link href="/login">Se connecter</Link>
      </p>
    </div>
  );
}
