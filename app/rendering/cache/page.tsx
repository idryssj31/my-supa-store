import Link from "next/link";
import { RevalidateCacheButton } from "@/components/rendering/RevalidateCacheButton";
import { getBaseUrl } from "@/lib/get-base-url";
import styles from "./page.module.css";

type ProductsApiResponse = {
  generatedAt: string;
  products: Array<{
    slug: string;
    name: string;
    price: number;
  }>;
};

type CacheMode = "force-cache" | "no-store" | "tagged";

async function fetchProducts(
  baseUrl: string,
  mode: CacheMode,
): Promise<ProductsApiResponse> {
  const url = `${baseUrl}/api/products`;

  const response = await fetch(
    url,
    mode === "force-cache"
      ? { cache: "force-cache" }
      : mode === "no-store"
        ? { cache: "no-store" }
        : { next: { revalidate: 60, tags: ["products"] } },
  );

  if (!response.ok) {
    throw new Error(`Échec fetch ${mode}`);
  }

  return response.json() as Promise<ProductsApiResponse>;
}

function CacheSection({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: ProductsApiResponse;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDesc}>{description}</p>
      <p className={styles.timestamp}>
        API générée le :{" "}
        <time dateTime={data.generatedAt}>{data.generatedAt}</time>
      </p>
      <ul className={styles.list}>
        {data.products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <span> — {product.price.toFixed(2)} €</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CacheRenderingPage() {
  const baseUrl = await getBaseUrl();

  const [forceCached, noStore, tagged] = await Promise.all([
    fetchProducts(baseUrl, "force-cache"),
    fetchProducts(baseUrl, "no-store"),
    fetchProducts(baseUrl, "tagged"),
  ]);

  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Comparatif cache fetch (étape 07)</h1>
      <p className={styles.subtitle}>
        Next.js 16 : rien n&apos;est caché par défaut. Ici, trois appels{" "}
        <code>fetch</code> vers <code>/api/products</code> avec des stratégies
        différentes. Modifiez un prix dans Prisma Studio, puis comparez les
        timestamps après revalidation.
      </p>

      <RevalidateCacheButton />

      <CacheSection
        title='cache: "force-cache"'
        description="Réponse mise en cache indéfiniment jusqu'à invalidation ou rebuild."
        data={forceCached}
      />
      <CacheSection
        title='cache: "no-store"'
        description="Toujours frais — timestamp change à chaque refresh de cette page."
        data={noStore}
      />
      <CacheSection
        title='next: { revalidate: 60, tags: ["products"] }'
        description="ISR + tag « products » — invalidable via revalidateTag."
        data={tagged}
      />
    </div>
  );
}
