"use client";

import styles from "./cart.module.css";
import { useCart } from "./CartProvider";

export function AddToCartButton({ productName }: { productName: string }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={addItem}
      aria-label={`Ajouter ${productName} au panier`}
    >
      Ajouter au panier
    </button>
  );
}
