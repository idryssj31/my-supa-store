import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function AdminPage() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <h1 className={styles.title}>Administration</h1>
      <p className={styles.subtitle}>
        Liste des produits (fetch direct Prisma en Server Component)
      </p>
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
    </div>
  );
}
