import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { EditProductForm } from "@/components/admin/EditProductForm";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

async function AdminProductTable() {
  await connection();

  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Slug</th>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <Link href={`/products/${product.slug}`}>{product.slug}</Link>
            </td>
            <td>{product.name}</td>
            <td>{product.price.toFixed(2)} €</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

async function AdminProductForms() {
  await connection();

  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <div className={styles.forms}>
      {products.map((product) => (
        <EditProductForm
          key={product.slug}
          product={{
            slug: product.slug,
            name: product.name,
            price: product.price,
            description: product.description,
            specs: product.specs,
          }}
        />
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <div>
      <h1 className={styles.title}>Administration</h1>
      <p className={styles.subtitle}>
        Liste et édition des produits (Server Components + Server Action Zod)
      </p>

      <Suspense fallback={<p className={styles.subtitle}>Chargement du tableau…</p>}>
        <AdminProductTable />
      </Suspense>

      <h2 className={styles.sectionTitle}>Modifier un produit</h2>
      <p className={styles.subtitle}>
        Formulaire natif <code>&lt;form action=&#123;action&#125;&gt;</code> — étape 03
      </p>

      <Suspense fallback={<p className={styles.subtitle}>Chargement des formulaires…</p>}>
        <AdminProductForms />
      </Suspense>
    </div>
  );
}
