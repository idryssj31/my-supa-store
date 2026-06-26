"use client";

import { useState } from "react";
import { revalidateProductsCache } from "@/app/actions/revalidate";
import styles from "./revalidate-cache-button.module.css";

export function RevalidateCacheButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);
    setMessage(null);

    try {
      await revalidateProductsCache();
      setMessage("Cache invalidé — rafraîchissez la page pour voir l'effet.");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la revalidation.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? "Revalidation…" : "Revalider le cache (revalidateTag + revalidatePath)"}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
