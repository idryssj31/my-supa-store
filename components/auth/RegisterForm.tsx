"use client";

import { useActionState } from "react";
import {
  registerAction,
  type RegisterState,
} from "@/app/actions/register";
import styles from "./auth-forms.module.css";

const initialState: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <label className={styles.label}>
        Nom
        <input
          className={styles.input}
          type="text"
          name="name"
          required
          autoComplete="name"
        />
      </label>
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
          minLength={6}
          autoComplete="new-password"
        />
      </label>

      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <button className={styles.button} type="submit" disabled={isPending}>
        {isPending ? "Inscription…" : "S'inscrire"}
      </button>
    </form>
  );
}
