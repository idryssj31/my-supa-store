"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./cart.module.css";

type AddToCartButtonProps = {
  productSlug: string;
  productName: string;
};

export function AddToCartButton({
  productSlug,
  productName,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productSlug, name: productName }),
      });

      if (!response.ok) {
        throw new Error("Impossible d'ajouter au panier");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={handleClick}
      disabled={isPending}
      aria-label={`Ajouter ${productName} au panier`}
    >
      {isPending ? "Ajout…" : "Ajouter au panier"}
    </button>
  );
}
