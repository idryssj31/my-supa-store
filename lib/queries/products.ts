import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
