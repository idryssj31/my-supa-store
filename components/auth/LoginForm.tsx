"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/login";
import styles from "./auth-forms.module.css";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} method="post" className={styles.form}>
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          autoComplete="email"
        />
      </label>
      <label className={styles.label}>
        Mot de passe
        <input
          className={styles.input}
          type="password"
          name="password"
          required
          autoComplete="current-password"
        />
      </label>

      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <button className={styles.button} type="submit" disabled={isPending}>
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
