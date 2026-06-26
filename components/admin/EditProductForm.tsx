"use client";

import { useActionState, useEffect } from "react";
import {
  updateProductAction,
  type UpdateProductState,
} from "@/app/actions/update-product";
import styles from "./edit-product-form.module.css";

type EditProductFormProps = {
  product: {
    slug: string;
    name: string;
    price: number;
    description: string;
    specs: string;
  };
};

const initialState: UpdateProductState = {};

export function EditProductForm({ product }: EditProductFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProductAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      const timeout = window.setTimeout(() => {
        window.location.reload();
      }, 800);

      return () => window.clearTimeout(timeout);
    }
  }, [state.success]);

  return (
    <form action={formAction} method="post" className={styles.form}>
      <input type="hidden" name="slug" value={product.slug} />

      <div className={styles.header}>
        <h3 className={styles.title}>{product.slug}</h3>
        {state.success && (
          <p className={styles.success} role="status">
            Produit mis à jour.
          </p>
        )}
      </div>

      <label className={styles.label}>
        Nom
        <input
          className={styles.input}
          type="text"
          name="name"
          defaultValue={product.name}
          required
        />
        {state.fieldErrors?.name && (
          <span className={styles.fieldError}>{state.fieldErrors.name[0]}</span>
        )}
      </label>

      <label className={styles.label}>
        Prix (€)
        <input
          className={styles.input}
          type="number"
          name="price"
          step="0.01"
          min="0.01"
          defaultValue={product.price}
          required
        />
        {state.fieldErrors?.price && (
          <span className={styles.fieldError}>{state.fieldErrors.price[0]}</span>
        )}
      </label>

      <label className={styles.label}>
        Description
        <textarea
          className={styles.textarea}
          name="description"
          rows={3}
          defaultValue={product.description}
          required
        />
        {state.fieldErrors?.description && (
          <span className={styles.fieldError}>
            {state.fieldErrors.description[0]}
          </span>
        )}
      </label>

      <label className={styles.label}>
        Spécifications
        <textarea
          className={styles.textarea}
          name="specs"
          rows={2}
          defaultValue={product.specs}
          required
        />
        {state.fieldErrors?.specs && (
          <span className={styles.fieldError}>{state.fieldErrors.specs[0]}</span>
        )}
      </label>

      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <button className={styles.button} type="submit" disabled={isPending}>
        {isPending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
