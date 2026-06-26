import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
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

export default function AdminPage() {
  return (
    <div>
      <h1 className={styles.title}>Administration</h1>
      <p className={styles.subtitle}>
        Liste des produits (fetch direct Prisma en Server Component)
      </p>
      <Suspense fallback={<p className={styles.subtitle}>Chargement du tableau…</p>}>
        <AdminProductTable />
      </Suspense>
    </div>
  );
}
