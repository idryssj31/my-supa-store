import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.title}>Nos produits</h1>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.slug} className={styles.card}>
            <Link href={`/products/${product.slug}`} className={styles.cardLink}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className={styles.image}
              />
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.price}>{product.price.toFixed(2)} €</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
