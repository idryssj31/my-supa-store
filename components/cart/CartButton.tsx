"use client";

import styles from "./cart.module.css";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <span className={styles.cartButton} aria-label={`Panier : ${itemCount} article(s)`}>
      Panier ({itemCount})
    </span>
  );
}
