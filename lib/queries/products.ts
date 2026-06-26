import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getProductSlugs() {
  const products = await prisma.product.findMany({
    select: { slug: true },
    orderBy: { id: "asc" },
  });
  return products.map((product) => product.slug);
}

export async function getProducts() {
  return unstable_cache(
    async () => prisma.product.findMany({ orderBy: { id: "asc" } }),
    ["products-list"],
    { tags: ["products"], revalidate: 3600 },
  )();
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
