import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "../auth-pages.module.css";

type LoginPageProps = {
  searchParams: Promise<{ registered?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { registered } = await searchParams;

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Connexion</h1>
      <p className={styles.subtitle}>
        {registered
          ? "Compte créé. Connectez-vous avec vos identifiants."
          : "Accédez à votre compte My Supa Store."}
      </p>
      <LoginForm />
      <p className={styles.footer}>
        Pas encore de compte ? <Link href="/register">S&apos;inscrire</Link>
      </p>
    </div>
  );
}
