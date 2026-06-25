import { prisma } from "@/lib/prisma";

const PRODUCT_LOAD_DELAY_MS = 500;

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, PRODUCT_LOAD_DELAY_MS));
  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

export async function getProductBySlug(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, PRODUCT_LOAD_DELAY_MS));
  return prisma.product.findUnique({ where: { slug } });
}
