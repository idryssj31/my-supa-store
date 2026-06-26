import { prisma } from "@/lib/prisma";

export async function getProductSlugs() {
  const products = await prisma.product.findMany({
    select: { slug: true },
    orderBy: { id: "asc" },
  });
  return products.map((product) => product.slug);
}

export async function getProducts() {
  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
